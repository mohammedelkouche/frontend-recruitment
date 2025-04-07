This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Recruitment Platform

A multilingual recruitment web app built with **Next.js 14**, designed to streamline the hiring process for both candidates and recruiters. Supports English 🇬🇧, French 🇫🇷, and Spanish 🇪🇸.

## Features

### Candidate Side
- Fill in a complete application form with personal info and resume upload
- Multilingual support (EN, FR, ES)
- Fully responsive design

### Recruiter Side
- Browse all candidate applications in a sortable list
- View detailed profiles
- Use the platform in the preferred language

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI**: [Ant Design](https://ant.design/) + [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Internationalization**: Custom i18n with Context API
- **Routing**: Locale-based routing with Next.js middleware

## Project Structure
```
src/
├── app/
│   ├── [locale]/          # Dynamic locale segment
│   │   ├── candidates/
│   │   │   └── [id]/
│   │   │       └── page.js
│   │   ├── form/
│   │   │   └── page.js
│   │   ├── recruiters/
│   │   │   └── page.js
│   │   └── page.js        # Homepage
│   ├── globals.css
│   ├── layout.js          # Root layout
│   └── redux/
│       ├── candidatesSlice.js
│       └── store.js
├── components/
│   └── LanguageSelector.js
├── i18n/
│   ├── config.js
│   ├── I18nProvider.js
│   └── locales/
│       ├── en.json
│       ├── fr.json
│       └── es.json
└── middleware.js
```


## Internationalization

- URL-based locale detection and routing (e.g., `/en/form`, `/fr/recruiters`)
- Language switcher component
- Auto-redirect to default locale when none is set
- Easy to extend with more languages

## Getting Started

To run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/recruitment-platform.git
cd recruitment-platform

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

# 4
Open http://localhost:3000 in your browser to see the app in action.
```
## UML Diagrams

```
/docs
  └── uml/
       ├── use-case-diagram.png
       ├── class-diagram.png
       ├── sequence-diagram.png
       └── component-diagram.png
```

### Use Case Diagram
![Use Case Diagram](./docs/uml/use-case-diagram.png)

### Class Diagram
![Class Diagram](./docs/uml/class-diagram.png)



