import { createSignal, createEffect } from 'solid-js'

import './Sidepanel.css'

export const Sidepanel = () => {
  const [countSync, setCountSync] = createSignal(0)
  const link = 'https://github.com/guocaoyi/create-chrome-ext'

  createEffect(() => {
    chrome.storage.sync.get(['count'], (result) => {
      setCountSync(result.count || 0)
    })

    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === 'COUNT') {
        setCountSync(request.count || 0)
      }
    })
  }, [])

  return (
    <main>
      <h3>SidePanel Page</h3>
      <h4>Count from Popup: {countSync()}</h4>
      <a href={link} target="_blank">
        generated by create-chrome-ext
      </a>
    </main>
  )
}

export default Sidepanel
