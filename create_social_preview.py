
from PIL import Image, ImageDraw, ImageFont

# Image dimensions
width = 1200
height = 630

# Create a new image with a dark background
image = Image.new('RGB', (width, height), color = '#1a1a1a')

draw = ImageDraw.Draw(image)

# Font and text
try:
    # Use a common font that is likely to be on the system
    font_title = ImageFont.truetype("arial.ttf", 80)
    font_subtitle = ImageFont.truetype("arial.ttf", 50)
except IOError:
    # If the font is not found, use the default font
    font_title = ImageFont.load_default()
    font_subtitle = ImageFont.load_default()


title_text = "Help Build ZARX"
subtitle_text = "50x Cheaper AI from Bangladesh"
tagline_text = "Fundraising for the first GPU"

# Calculate text positions
title_width, title_height = draw.textbbox((0, 0), title_text, font=font_title)[2:]
subtitle_width, subtitle_height = draw.textbbox((0, 0), subtitle_text, font=font_subtitle)[2:]
tagline_width, tagline_height = draw.textbbox((0,0), tagline_text, font=font_subtitle)[2:]

# Position the text in the center
title_x = (width - title_width) / 2
title_y = (height / 2) - title_height

subtitle_x = (width - subtitle_width) / 2
subtitle_y = title_y + title_height + 20

tagline_x = (width - tagline_width) / 2
tagline_y = subtitle_y + subtitle_height + 30

# Draw the text on the image
draw.text((title_x, title_y), title_text, font=font_title, fill='#ffffff')
draw.text((subtitle_x, subtitle_y), subtitle_text, font=font_subtitle, fill='#cccccc')
draw.text((tagline_x, tagline_y), tagline_text, font=font_subtitle, fill='#999999')


# Save the image
image.save('social_preview.png')

print("social_preview.png created successfully.")
