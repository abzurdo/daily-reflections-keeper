
# Daily Reflections Keeper

## Overview

Daily Reflections Keeper is a mobile application designed to help users capture and track their daily thoughts, experiences, and personal growth through guided journaling.

## Features

- 📓 Daily journaling with prompts
- 🔔 Daily notification reminders
- 📅 Journal entry history
- 🌟 Simple and intuitive interface

## Technologies Used

- React
- TypeScript
- Capacitor
- Tailwind CSS
- Shadcn UI
- Supabase (optional backend)

## Prerequisites

- Node.js (v18+)
- npm or bun
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Getting Started

### Local Development

1. Clone the repository
```bash
git clone <your-repository-url>
cd daily-reflections-keeper
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

### Mobile Development

#### Android
```bash
npx cap add android
npm run build
npx cap sync android
npx cap open android
```

#### iOS
```bash
npx cap add ios
npm run build
npx cap sync ios
npx cap open ios
```

## Configuration

- Customize notification times in `src/utils/notifications.ts`
- Adjust app settings in `capacitor.config.ts`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License.

## Contact

Project Link: [Your Project URL]
