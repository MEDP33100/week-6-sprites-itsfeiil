class Sprite {
    constructor(title, artist, image) {
        this.title = title;
        this.artist = artist;
        this.image = image;
        this.element = this.createSpriteElement();
    }

    createSpriteElement() {
        const spriteDiv = document.createElement('div');
        spriteDiv.classList.add('sprite');

        const img = document.createElement('img');
        img.src = this.image;
        img.alt = this.title;

        const titleText = document.createElement('div');
        titleText.textContent = `${this.title}`;

        spriteDiv.appendChild(img);
        spriteDiv.appendChild(titleText);
        
        return spriteDiv;
    }

    render(container) {
        container.appendChild(this.element);
    }

    animate() {
        // GSAP
        gsap.from(this.element, { scale: 0, opacity: 0, duration: 1 });
        gsap.to(this.element, { rotation: 360, duration: 2, repeat: -1, yoyo: true });
    }
}

// fetch data
async function loadSprites() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        const container = document.getElementById('sprite-container');
        
        data.forEach(item => {
            const sprite = new Sprite(item.title, item.artist, item.image);
            sprite.render(container);
            sprite.animate();
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

window.onload = loadSprites;