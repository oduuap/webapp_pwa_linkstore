#!/usr/bin/env python3
"""
Generate placeholder icons for PWA
Requires Pillow: pip3 install pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
except ImportError:
    print("Error: Pillow library is required.")
    print("Install it with: pip3 install pillow")
    exit(1)

# Icon sizes needed for PWA
SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

# Colors
BACKGROUND_COLOR = (102, 126, 234)  # #667eea
TEXT_COLOR = (255, 255, 255)  # White

def create_icon(size):
    """Create a simple icon with the app initial"""
    # Create image with background color
    image = Image.new('RGB', (size, size), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(image)

    # Try to use a nice font, fallback to default
    try:
        # Try different font paths for different systems
        font_paths = [
            '/System/Library/Fonts/Helvetica.ttc',  # macOS
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',  # Linux
            'C:\\Windows\\Fonts\\arial.ttf',  # Windows
        ]

        font_size = int(size * 0.5)
        font = None

        for font_path in font_paths:
            if os.path.exists(font_path):
                font = ImageFont.truetype(font_path, font_size)
                break

        if font is None:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()

    # Draw text in center
    text = "W"

    # Get text bounding box for centering
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Calculate position to center text
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - bbox[1]

    # Draw the text
    draw.text((x, y), text, fill=TEXT_COLOR, font=font)

    # Draw a subtle circle border
    border_width = max(2, size // 50)
    draw.ellipse(
        [border_width, border_width, size - border_width, size - border_width],
        outline=TEXT_COLOR,
        width=border_width
    )

    return image

def main():
    """Generate all icon sizes"""
    print("Generating PWA icons...")

    for size in SIZES:
        filename = f"icon-{size}.png"
        print(f"Creating {filename}...")

        icon = create_icon(size)
        icon.save(filename, 'PNG')

        print(f"✓ {filename} created ({size}x{size})")

    print("\n✓ All icons generated successfully!")
    print("\nIcon files created:")
    for size in SIZES:
        print(f"  - icon-{size}.png")

    print("\nYou can now run the web app with a local server:")
    print("  python3 -m http.server 8000")

if __name__ == "__main__":
    main()
