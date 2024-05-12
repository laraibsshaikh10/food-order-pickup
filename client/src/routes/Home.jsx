const Home = () => {
  return (
    <>
  <div className="home-title">
    <h1>Calcifer's Hearth</h1>
  </div>
  <div className="home-banner">
    <img
      src="https://64.media.tumblr.com/2b26da39aa99d90b363f140094e9a64b/b3956f8e366a8ea8-86/s1280x1920/6efef185a01c8283b890abdf0b09b8b58772cfca.jpg"
      alt="Calcifer Banner"
    />
  </div>
  <div className="home-body">
    <div className="home-quote">
      <h2>Welcome to Calcifer's Hearth!</h2>
      <p>
        "I'm not afraid of you. I've got Cup Ramen on my side." - "Ponyo", 2008{" "}
      </p>
      <div className="home-button">
        <a href="/menu_items" className="btn-view-menu">
          <h3>View Our Menu</h3>
        </a>
      </div>
    </div>
    <div className="home-logo" />
    <img
      src="https://mystickermania.com/cdn/stickers/anime/howls-castle-calcifer-512x512.png"
      alt="Calcifer Logo"
    />
  </div>
</>

  )
}
export default Home
