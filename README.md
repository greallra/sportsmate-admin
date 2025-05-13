```diff
- text in red
+ text in green
! text in orange
# text in gray
@@ text in purple (and bold)@@

# React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# ARCHITECTURE
! 1. Build Tool: VITE    ####### done #######
- WHY?
Faster, less config
+ Links / Notes
https://www.robinwieruch.de/react-libraries/#starting-a-new-react-project

! 2. PACKAGE MANAGER: NPM    ####### done #######
- WHY?
+ Links / Notes

! 3. DESIGN AND STYLE: CSS LIBRARY + uiverse   ####### DONE #######
- WHY?
class declaration is quick, You aren’t wasting energy inventing class namesfunctional approach(combine utility classes), Your CSS stops growing
follow rules of a design system, you’re choosing styles from a predefined design system,
you can use Tailwind’s responsive utilities to build fully responsive interfaces easily.
state variants make it easy to style those states with utility classes.
never ship unused CSS again
production build small
- Principles: (https://medium.com/@nileshshindeofficial/understanding-tailwind-css-a-comprehensive-guide-81279182f72e)
- Utility-First Approach, Configurability, Responsive Design
-icons: https://www.npmjs.com/package/lucide-react

+ Links / Notes
https://uiverse.io/tooltips?t=tailwind
https://medium.com/@nileshshindeofficial/understanding-tailwind-css-a-comprehensive-guide-81279182f72e

! 3.5 COMPONENT LIBRARY   ####### NOT SURE YET #######
- WHY?

Comp Library options:
1. Headless: Radix ?? , react aria, Headlessui, Ark UI (comes with just the Javascript functionality)
2. Mantine (cons: conflicts a bit with tailwind)
3. Radix (Gives functionality no style)
4. Shadcn (uses radix) (pros: accessibility)
5. DaisyUI / flowbite (no importing components, just using css classes, could use both) - Most Daisy components require you to write your own JS
(
    what? is a component library for Tailwind CSS
    pros: pure CSS component library, works off css classes)

+ Links / Notes
https://www.youtube.com/watch?v=mr15Xzb1Ook


! 4. STATE MANAGEMENT: Zustand + Context  ####### kinda done but needs more research #######
- WHY?
Zustand / Context simpler than redux
+ Links / Notes
useState/useReducer for co-located or shared state (see tutorial)
opt-in useContext for enabling little global state (see tutorial)
Zustand (or an alternative) for lots of global state
RQ + Zustand for state + api fetching
https://www.reddit.com/r/reactjs/comments/riq9v6/i_chose_zustand_over_context_api_for_my_side/
https://dev.to/shubhamtiwari909/react-context-api-vs-zustand-pki

! 5. Testing: Vitest + Cypress
- WHY?
+ Links / Notes
 https://testdouble.com/insights/react-context-for-dependency-injection-not-state-management
Unit/Integration: Vitest + React Testing Library (most popular), E2E Tests: Playwright or Cypress, Jest (unit tests)

! 6. DATA FETHCING: RQ ####### kinda done #######
- WHY?
Solves problems needed to be solved before with effects
+ Links / Notes

! 7. ROUTING: react router ####### done #######
- WHY?
Standard
+ Links / Notes

! 8. FORMS - React Hook Form + Zod(validation) ####### done #######
- WHY?
Zod gives nice shema writing and means less code
RHF handles application of this schema
+ Links / Notes

! 9. REACT ANIMATION LIBRARIES: Css mainly : Framer Motion (most recommended if css cant solve)
- WHY?
+ Links / Notes

! 10. VISUALIZATION AND CHART LIBRARIES IN REACT: D3 for advances, recharts for simpler stuff
- WHY?
+ Links / Notes

! 11. REACT TYPE CHECKING: TypeScript ####### done #######
- WHY?
TypeScript has replaced prop types
+ Links / Notes

! 12. CODE STRUCTURE IN REACT: ESLint + Prettier
- WHY?
+ Links / Notes

! 13. REACT INTERNATIONALIZATION
- WHY?
+ Links / Notes

! 14. RICH TEXT EDITOR IN REACT
- WHY?
+ Links / Notes

! 15. PAYMENTS IN REACT
- WHY?
+ Links / Notes

! 15. TIME IN REACT date-fns
- WHY?
Easy and lightweight
+ Links / Notes

! 16. FILE UPLOAD IN REACT: React dropzone
- WHY?
common
+ Links / Notes

! 17. MAILS IN REACT: react-email (personal recommendation)
- WHY?
+ Links / Notes


# To Research
vite guide: https://vitejs.dev/guide
think about how app would be deployed and environments
ways auth might work

# npm dependencies description
    "@eslint/js": "^9.9.0",
    "@types/react": "^18.3.3", // ex const SomeComponent: React.FC<SomeComponentProps> =
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.10",
    "vite": "^5.4.1"

# Testing
Test runner: Vitest and Jest are the same kind of tool, a test runner. You would use one or the other, but not both
React testing: React Testing Library is a tool you use in your tests to render React components without an actual page in a browser.
https://www.reddit.com/r/reactjs/comments/1doof43/confused_with_react_testing_library_jest_and/
https://www.reddit.com/r/reactjs/comments/10zyse3/is_jest_still_faster_than_vitest/
https://www.reddit.com/r/reactjs/comments/11o4hy4/im_pretty_lost_trying_to_write_tests_that_mock_my/
https://www.reddit.com/r/reactjs/comments/18a70jb/how_do_you_test_a_function_that_makes_an_api_call/



# Extensions needed
tailwind css intellisense
co pilot
es7 react
prettier
es lint
```
