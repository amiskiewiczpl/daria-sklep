const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Rosna</h3>
            <p>Premium fashion for the modern woman.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p>Email: info@rosna.com</p>
            <p>Phone: +48 123 456 789</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p>Subscribe to get updates on new arrivals.</p>
            {/* External integration placeholder */}
            <button className="bg-white text-gray-800 px-4 py-2 rounded">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer