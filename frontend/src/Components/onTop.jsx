let onTop = () => {
  return (
    <button
  id="backToTopBtn"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed bottom-5 right-5 text-white px-4 py-2 rounded-full shadow-lg opacity-0 pointer-events-none transition-opacity duration-500 z-50"
  style={{backgroundColor: 'olive'}}
>
  ↑
</button>
  )
}

export default onTop;