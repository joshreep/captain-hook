import { useCallback, useEffect, useState } from 'react'
import { Status } from '../constants'
import useEventListener from '../useEventListener'

type SupportedScriptAttributesKeys =
    | 'async'
    | 'crossOrigin'
    | 'defer'
    | 'integrity'
    | 'noModule'
    | 'referrerPolicy'
    | 'text'
    | 'type'

export type SupportedScriptAttributes = Partial<Pick<HTMLScriptElement, SupportedScriptAttributesKeys>>

export default function useScript(src: string): Status {
    const [status, setStatus] = useState(src ? Status.Pending : Status.Idle)
    const [scriptAlreadyExists, setScriptAlreadyExists] = useState(false)
    const [scriptElement, setScriptElement] = useState<HTMLScriptElement>()

    const getStatusFromEvent = (event: Event) => (event.type === 'load' ? Status.Success : Status.Error)

    const setAttributeFromEvent = useCallback(
        (event: Event) => {
            scriptElement?.setAttribute('data-status', getStatusFromEvent(event))
        },
        [scriptElement],
    )

    const setStateFromEvent = useCallback((event: Event) => {
        setStatus(getStatusFromEvent(event))
    }, [])

    useEffect(() => {
        // Allow falsy src value if waiting on other data needed for
        // constructing the script URL passed to this hook.
        if (!src) {
            setStatus(Status.Idle)
            return
        }

        const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
        if (existingScript) {
            setScriptElement(existingScript)
            setScriptAlreadyExists(true)
        } else {
            setScriptAlreadyExists(false)
            setScriptElement(createScript(src))
        }
    }, [src])

    useEventListener('load', setAttributeFromEvent, scriptElement, !scriptAlreadyExists)
    useEventListener('error', setAttributeFromEvent, scriptElement, !scriptAlreadyExists)
    useEventListener('load', setStateFromEvent, scriptElement)
    useEventListener('error', setStateFromEvent, scriptElement)

    return status
}

/**
 * Creates a script with the given src and returns it
 */
function createScript(src: string): HTMLScriptElement {
    const script = document.createElement('script')
    document.body.appendChild(script)
    script.async = true
    script.setAttribute('data-status', Status.Pending)
    script.setAttribute('data-testid', src)
    script.src = src

    return script
}
