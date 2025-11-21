# Hotel booking system task

## Setup instructions

1. Install Node.js v16 and npm
2. Clone repository to your device
3. npm install & npm run dev (will be open http://localhost:5173)

## Technology choices

React: Used for building UIs, as it is component based, state driven and enables reusability
TypeScript: Provides static typing to catch errors early
Vite: Faster than create-react-app and provides fast development server
Redux Toolkit: Used for global state management for complex state logic
Prettier and Eslint: Checking code quality, formatting and seeing errors early

## Architecture decisions

Component structure: Created feature based components and used with shared data
State management: Used Redux slices for booking and stepping operations, also used simple states inside components
Responsiveness: Made via tailwind breakpoints and mobileDayCard component
Error handling: Created validation only in first part (BookingForm), do not used error boundaries

## Limitations

Limited validation
No code splitting or lazy loading (but only needed if app will be larger than current one)
No authentication
While being larger need to use feature folder structure
