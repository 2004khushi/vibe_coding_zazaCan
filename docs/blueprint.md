# **App Name**: Zaza Parallax

## Core Features:

- Animated Hero Section: Implements a full-screen hero section with a scroll-linked WebP animation. Controls playback of each frame according to scroll position.
- Drink Variant Switching: Allows users to switch between different drink variants, updating the hero text, theme color, and background WebP sequence. Provides PREV/NEXT navigation for cycling through variants.
- Customizable Content: Allows easy changing of the drink name, description, theme color, dark/light mode, and WebP sequences for each drink variant via a UI that exports the content in JSON format.
- Preloading and Loading Indicators: Displays a loading screen until the initial WebP sequence is fully loaded and shows loading indicators during variant switches to ensure smooth transitions. Checks status of file requests. Keeps an ongoing counter to determine loading status, if all frame URLs load before triggering preloading indicator to close. A tool that avoids flicker.
- Navigation and Sections: Includes a sticky top navigation bar with links to the main sections and a dark/light mode toggle. Indicates the active section during scrolling.
- Social Icons: Display a row of monochrome social media icons in both the main hero layout (bottom center) and footer (along with other standard footer fare).
- Theming: Allows specification of a dark or light theme mode and accent theme color that will be automatically implemented for elements of the page (excluding preloaded images)

## Style Guidelines:

- Background color: Near-black (#121212) for a cinematic dark mode experience. A switch will enable white-mode to swap #121212 for a more modern background like #F5F5DC.
- Primary color: Pure white (#FFFFFF) for text and key elements to provide strong contrast on the dark background.
- Accent color: Use Zaza brand black (#000000) for CTAs and subtle highlights, which complements the black and white color scheme.
- Body and headline font: 'Inter' sans-serif font is used throughout the site. This is used to enhance readability in a variety of contexts.
- Use minimal and monochrome social icons in the hero section and footer. Each icon maintains the same white color with simple borders, adding the black background from the dark theme.
- Full-screen hero section with overlay text block on the left, a visually clean center area to showcase the animation, and a vertical variant navigation strip on the right. Layout adheres to a modern, dark design to highlight the can variants in their true, beautiful monochrome color palette.
- Parallax scroll behavior maps the scroll position to the frame index of the WebP sequence for smooth and responsive animations. Implemented subtle fade-in/fade-out transitions on variant switching to show a change of cans on the home page. Animations showcase product movement. Each layout is designed with intention to emphasize an exciting user experience with each new Zaza canned soda flavor.