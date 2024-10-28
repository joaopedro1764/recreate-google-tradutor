import { useEffect, useState } from "react"

function App() {

  const languages = [

    { code: 'en', name: "Inglês" },
    { code: 'es', name: "Espanhol" },
    { code: 'fr', name: "Francês" },
    { code: 'de', name: "Alemão" },
    { code: 'it', name: "Italiano" },
    { code: 'pt', name: "Português" },


  ]

  const [sourceLang, setSourceLang] = useState<string>('pt');
  const [targetLang, setTargetLang] = useState<string>('en');
  const [sourceText, setSourceText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [translatedText, setTranslatedText] = useState("")

  const handleTranslate = async () => {

    setIsLoading(true)
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLang}|${targetLang}`)

    if (!response.ok) {
      throw new Error(`HTTP ERROR: ${response.status}`)
    }

    const data = await response.json();
    console.log(data);
    setTranslatedText(data.responseData.translatedText)
    setIsLoading(false)

  }



  useEffect(() => {
    if (sourceText) {
      const delay = setTimeout(() => {
        handleTranslate()
      }, 500)

      return clearTimeout(delay)
    }
    handleTranslate()

  }, [sourceText])


  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-200">
        <header className="w-full bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
            <h1 className="text-gray-600 text-3xl text-cente font-normal">Tradutor João Pedro</h1>
          </div>
        </header>
        <main className="flex-grow flex items-start justify-center px-4 py-8">
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <select onChange={event => setSourceLang(event.target.value)} value={sourceLang} className="text-sm text-slate-700 bg4 border-none focus:outline-none cursor-pointer">
                {
                  languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))
                }

              </select>
              <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
                <svg
                  className="w-5 h-5 text-headerColor"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </button>
              <select onChange={event => setTargetLang(event.target.value)} value={targetLang} className="text-sm text-slate-700 bg4 border-none focus:outline-none cursor-pointer">
                {
                  languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))
                }

              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-4">
                <textarea
                  onChange={event => setSourceText(event.target.value)} placeholder="Digite seu Texto..."
                  className="w-full h-40 text-lg text-slate-700 bg-transparent resize-none border-none outline-none"
                />
              </div>
              <div className="p-4 relative bg-gray-100 border-l border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  {
                    isLoading ? (
                      <div className="animate-spin rounded-full w-8 h-8 border-t-2 border-t-blue-500" />
                    )
                      : (
                        <p className="text-lg text-slate-700">{translatedText}</p>

                      )
                  }
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-5xl mx-auto px-4 py-3 text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Tradutor João Pedro
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
