# Louis' Repacks

> **Simple, optimized game repacks ready to download. Just pick a game and go.**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Educational Use Only](https://img.shields.io/badge/Purpose-Educational-yellow)](pages/about/)

---

## About

Louis' Repacks is a curated collection of carefully optimized game repacks. Each game is compressed, cleaned, and prepared for easy installation with minimal hassle. The site provides a simple, user-friendly interface to browse, search, and download repacks.

**This project is for educational use only.** Please support the original developers whenever possible by purchasing games through official channels.

---

## Features

- **Optimized Repacks**: Games are compressed to reduce file sizes while maintaining quality
- **Easy Browsing**: Clean, responsive interface with game covers, descriptions, and metadata
- **Search Functionality**: Quickly find games by title
- **Detailed Information**: Each game includes description, genre, developer, publisher, release date, size, and language
- **Screenshot Galleries**: Preview gameplay before downloading
- **Help Section**: Step-by-step guides for downloading, extracting, and installing
- **No Ads**: Clean experience focused on the content

---

## Getting Started

### For Users

1. Visit the site (host it locally or deploy it)
2. Browse the game library or use the search bar
3. Click on any game to see details and screenshots
4. Click "Download Now" to get the repack
5. Follow the [Help](pages/help/) guide for extraction and installation instructions

### For Developers

To run or modify this project locally:

```bash
# Clone the repository
git clone https://github.com/louishermanpaelinck/louisrepacks.git
cd louisrepacks

# Open pages/index.html in your browser
# Or use a local server for better experience
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## Project Structure

```
.
├── pages/                  # All HTML pages
│   ├── index.html          # Main page with game listings
│   ├── preview.html        # Game detail/preview page
│   ├── help/               # Help documentation
│   │   └── index.html      # Help page with installation guides
│   └── about/              # About page
│       └── index.html      # About information
├── assets/                 # All static assets
│   ├── css/                # Stylesheets
│   │   └── main.css        # Main stylesheet
│   ├── js/                 # JavaScript files
│   │   ├── main.js         # Main JavaScript for game loading and search
│   │   └── preview.js      # JavaScript for game detail page
│   ├── data/               # Data files
│   │   └── games.json      # Game database with all repack metadata
│   └── images/             # All images
│       ├── logo.png        # Site logo
│       └── games/          # Game covers, icons, and screenshots
│           └── [game-id]/   # Organized by game ID
│               ├── Game.ico # Game icon
│               ├── cover.*  # Game cover image
│               └── Screen*.jpg  # Screenshots
├── LICENSE                 # Apache 2.0 License
└── README.md               # This file
```

---

## Adding a New Game

To add a new repack to the site:

1. **Add game metadata** to `assets/data/games.json`:
   ```json
   {
     "id": "GAME_ID",
     "title": "Game Title",
     "description": "Short description",
     "longDescription": "Detailed description",
     "date": "Release date",
     "size": "File size",
     "genre": "Genre",
     "developer": "Developer",
     "publisher": "Publisher",
     "language": "Language",
     "repackNotes": "Any special notes",
     "cover": "assets/images/games/GAME_ID/cover.jpg",
     "icon": "assets/images/games/GAME_ID/Game.ico",
     "screenshots": [
       "assets/images/games/GAME_ID/Screen1.jpg",
       "assets/images/games/GAME_ID/Screen2.jpg",
       "assets/images/games/GAME_ID/Screen3.jpg"
     ],
     "link": "Download URL"
   }
   ```

2. **Add game assets** to `assets/images/games/GAME_ID/`:
   - Cover image (recommended: 300x400px)
   - Game icon (.ico format, named `Game.ico`)
   - 3-5 screenshots (named `Screen1.jpg`, `Screen2.jpg`, etc.)

3. **Test** the site to ensure the game appears correctly

---

## Legal Notice

> **⚠️ IMPORTANT: Educational Use Only**

This project and all associated repacks are provided for **educational purposes only**. 

- All game files are property of their respective owners
- You must own the original game to legally use these repacks
- Please support developers by purchasing games through official channels
- Distribution of copyrighted material without permission may violate applicable laws

By using this site, you agree to use the content responsibly and in accordance with all applicable laws.

---

## Technologies Used

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **No Frameworks**: Pure, lightweight implementation
- **Responsive Design**: Works on desktop and mobile devices
- **Modern CSS**: CSS variables, Flexbox, Grid

---

## Contributing

Contributions are welcome! Please follow these guidelines:

- **Reporting Issues**: Open an issue with clear reproduction steps
- **Suggesting Games**: Open an issue with game details and download source
- **Code Contributions**: Fork the repo, make changes, and submit a PR
- **Game Additions**: Ensure all metadata is complete and assets are properly sized

---

## License

This project is licensed under the **Apache License 2.0** - see [LICENSE](LICENSE) for details.

The license applies to the website code and structure, not to the game content or repacks themselves.

---

## Contact & Support

- **Website**: [Louis' Repacks](https://github.com/louishermanpaelinck/louisrepacks)
- **Issues**: [GitHub Issues](https://github.com/louishermanpaelinck/louisrepacks/issues)
- **Educational Use**: This project is for learning and educational purposes only

---

*© 2026 Louis' Repacks - All rights reserved to their respective owners*
