import { useEffect, useState } from 'react'
import { Status } from '../constants'
import useEventListener from '../useEventListener'

export { Status }
export default function useScript(src: string) {
    const [status, setStatus] = useState<Status>(src ? Status.Pending : Status.Idle)

    useEffect(() => {
        if (!src) {
            setStatus(Status.Idle)
            return
        }
    }, [src])

    const { script, scriptAlreadyInDom } = getOrCreateScript(src)

    if (scriptAlreadyInDom) {
        const statusFromScriptElement = script.getAttribute('data-status')
        switch (statusFromScriptElement) {
            case Status.Success:
            case Status.Error:
            case Status.Idle:
            case Status.Pending:
                setStatus(statusFromScriptElement)
        }
    }

    function setAttributeFromElement(event: Event) {
        script.setAttribute('data-status', event.type === 'load' ? Status.Success : Status.Error)
    }

    function setStateFromEvent(event: Event) {
        setStatus(event.type === 'load' ? Status.Success : Status.Error)
    }

    useEventListener('load', setAttributeFromElement, script, !scriptAlreadyInDom)
    useEventListener('error', setAttributeFromElement, script, !scriptAlreadyInDom)
    useEventListener('load', setStateFromEvent, script)
    useEventListener('error', setStateFromEvent, script)

    return status
}

function getOrCreateScript(src: string) {
    const scriptAlreadyInDom = document.querySelector(`script[src="${src}"]`)

    if (scriptAlreadyInDom) return { script: scriptAlreadyInDom, scriptAlreadyInDom: true }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.dataset.testid = 'useScript-scriptElement'
    document.body.appendChild(script)

    return { script, scriptAlreadyInDom: false }
}
