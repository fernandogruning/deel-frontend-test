# Deel Frontend test

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

A regular `Component` will update every time its state or props change unless `shouldComponentUpdate` is used, while a `PureComponent` uses `shouldComponentUpdate` automatically, preventing re-rendering in some cases.

Using `PureComponent` could lead to its children components to not update properly if they change but the `PureComponent` doesn’t.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

`shouldComponentUpdate` prevents a component from rendering when no new props or state are passed, so when data from a Context changes outside this component it will prevent children that access this Context to re-render with the new values.

## 3. Describe 3 ways to pass _information_ from a component to its PARENT.

- **By passing a updater function through props**: By prop drilling state and state updaters, children or nested components can update data and lift state up back to the parent in a simple way. The disadvantage of this is that components between the parent and the descendant will have to handle possibly unrelated props to be able to pass them down.
- **By using a external global state management repository**: Libraries like Redux, MobX and StateX can handle global state that’s shared and updated across multiple components without incurring in prop drilling and lifting state up.
- **By using React Context**: Using context allows state to be passed into deeply nested components without prop drilling and can be used to pass state updaters that allow components to update state used by their parents.

## 4. Give 2 ways to prevent components from re-rendering.

- **Memo-ing the component with `React.memo`**: This will memo the component function and prevent re-rendering when the same props and state is passed to the component.
- **Using the `shouldComponentUpdate` hook**: This allows for the component to determine whether to re-render based on a boolean returned from the comparison function that the hook takes as a parameter. The function gives access to the next state and props and can be used to compare them with current props and state.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a special React component that allows having multiple elements as children without rendering an extra DOM element. It’s specially useful when there are multiple elements that need to be rendered but having a container DOM element would result in unwanted or invalid HTML, breaking the app in the case of a `select` element containing anything other than `option` elements, for example.

## 6. Give 3 examples of the HOC pattern.

- **Decorate a component with data**: An Higher Order component can be used to fetch and/or compute data and pass it to a component, leaving the possibly complex logic outside the component. This is useful when a component doesn’t need to handle fetching logic, when data is composed from multiple external sources or when data comes from an external state library, for instance.
- **Abstract unrelated logic from components**: Cases like error logging, state handling, and common logic reusability can be implemented like HOCs without modifying the target components, keeping everything in one place and reusable.
- **Leverage conditional rendering**: Specially useful when a component depends on external data to be rendered and the intended behavior is to wait until the data is present, to avoid dealing with possibly undefined values. A use case would be using this type of HOC to prevent rendering a component that has a hook with a dependency to external data and can’t be called conditionally.

## 7. What's the difference in handling exceptions in promises, callbacks and async...await.

- **Promises**: exceptions are handled with the `.catch()` chain function, attached either after a `Promise.resolve()` call or a `.then()` chain. While it’s straightforward to use, it could lead to terse code that has a lot of chain calls and it’s very difficult and verbose to handle multiple promises and their exceptions, leading to a lot of nested `.catch` calls.
- **Callbacks**: In this case, there is no explicit error thrown, so handling an error relies a lot in knowing before time what the possible exception causes. Here the exceptions are handled inside each callback by parsing and validating the data used (params, execution results, etc.) and implementing safeguards against possible exception cases. Aside from the nested callback pattern, this leads to very verbose callback functions that have to handle all possible exceptions, making the code harder to reason about.
- `**async...await`\*\* : This is case is the most straightforward of the three and the one with the better DX. The async code is wrapped in a `try...catch` block and any exceptions thrown from the code run on the `try` block can be handled in the `catch` block, which has an optional `error` argument that can be used to access the `Error` thrown. Multiple exceptions can be handled with one single `catch` block, separating the “happy paths” from their error handling. This pattern also simplifies handling errors for nested async blocks without halting the overall execution of the rest of the async processes.

## 8. How many arguments does setState take and why is it async.

`setState` takes one required argument, which can be the updated piece of data for the state or an updater function, and an optional callback function argument. Passing the new state as the argument, updates the state and ditches the old state, while passing the updater function allows access to the previous state and makes it possible to do computation with both state snapshots. This is useful when updating states holding array or object values, for instance.
The second argument is a callback function that can be used to execute code synchronously after the state gets updated.

`setState` is async because it is added to React’s own task scheduler and React determines when is the optimal moment to update the state, batching multiple `setState` calls and preventing unnecessary executions by just using the last call in the batch within a certain time range.

## 9. List the steps needed to migrate a Class to Function Component.

1. A new function that takes the component props as parameters and returns the JSX is implemented.
2. State defined in the class is converted to a `useState` function call, and `setState`

## 10. List a few ways styles can be used with components.

A component can be styled with:

- **Inline CSS**: Very crude and not recommended for most cases, but CSS can be directly applied to elements by passing a CSS object to the `style` prop. This is a foundation for many CSS-in-JS libraries like `styled-component`.
- **CSS stylesheets**: CSS stylesheets with global CSS can be applied either with external stylesheets or styling blocks inside a `<style>` tag. Useful if there’s already an existing stylesheet in the codebase and there’s no need to port it out of CSS, or if there’s an external CSS stylesheet that can be imported via the `<link>` tag.
- **CSS Modules**: Bundlers like Webpack and Parcel have support for importing CSS stylesheets into a JS file and injecting the CSS directly to HTML elements. Here, a CSS—or SCSS—file with an extension prefix of `.module` is imported to a JS file and treated like a regular ES module that exports an object containing all the classnames authored in CSS as object keys that can be applied to directly to elements. This pattern allows for separations of concerns between rendering and styling.
- **CSS-in-JS**: Libraries like `styled-components` and `emotion` use this approach for styling, allowing to author CSS directly into a component file, using either CSS template literals or CSS objects to define the styles of a component. By mixing concerns, a greater composition pattern can be achieved by tightly coupling rendering and styling.

## 11. How to render an HTML string coming from the server.

First the HTML string should be sanitized to prevent XSS attacks from malicious actors and validate that the string is valid HTML. This is achieved by using libraries like `dompurify` and `xss`. Afterwards, the sanitized string is rendered by using the `dangerouslySetInnerHTML` prop in the HTML element that will contain the HTML coming from the server. This is a escape hatch and is generally not a best practice—most apps should send data and not HTML from the server and handle rendering inside React itself.
