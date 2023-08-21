// NextJS App Router 

// This MutationObserver useEffect is good with next-themes module (The wallet provider cant detect what the next-themes state is on this top level, 
// so we have to query it from the window and match it on the inital render, abstractly bringing the state up one level)

const [darkMode, setDarkMode] = useState<boolean>(false)

useEffect(() => {
  let initialDarkMode = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  if (document.documentElement.classList.contains('light')) {
    initialDarkMode = false
  }

  setDarkMode(initialDarkMode)

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const classList = document.documentElement.classList
        if (classList.contains('dark')) {
          setDarkMode(true)
        } else if (classList.contains('light')) {
          setDarkMode(false)
        }
      }
    }
  })
  observer.observe(document.documentElement, { attributes: true })
  return () => observer.disconnect()
}, [])


// In the JSX render in the app/pages root router, replace with connectKit() or whatever
<RainbowKitProvider
chains={chains}
modalSize='compact'
theme={darkMode ? darkTheme() : lightTheme()}
>
</RainbowKitProvider>


