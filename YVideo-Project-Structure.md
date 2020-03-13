# YVideo Project Structure

## Intro - Layered Architecture

Layered Architecture is a way of organizing a code base which allows developers to better separate functionality of the project. In YVideo, we have 5 basic layers:

1. Components (UI)
2. Containers (View Models)
3. Store (Global Application State)
4. Services
5. Proxy

## Detailed Explanations

### 1. Components (UI)

This layer is only concerned with what the user sees. JavaScript files in this layer will contain Pure React Components, and Styled Components.

### 2. Containers (View Models)

In the MVVM Pattern (Model, View, View Model), the View Model contains all of the computed properties and handlers that the UI components will use. With very few exceptions, Containers should only return ONE component, and that component will take two props:

1. `viewstate`
2. `handlers`

#### ViewState

The `viewstate` contains hard and computed properties. A "hard property" is a simple data type, such as a string:

```js
{
  firstName: `Teddy`,
  lastName: `Roosevelt`,
  birthday: new Date(`October 27, 1858`)
}
```

A "computed property" is a function that returns a hard property, which is based on other hard properties:

```js
{
  fullName: () => {
    return `${this.firstName} ${this.lastName}`
  },
  age: () => {
    const timeDiff = Date.now().getTime() - this.birthday.getTime()
    return Math.floor(timeDiff / (1000 * 3600 * 24 * 365))
  }
}
```

#### Handlers

The `handlers` object contains any event handlers for user input. If the handlers are used on elements which emit an `Event` object, it may be useful to use "Courier Functions", which allow a custom parameter, while keeping the `Event` object in order to prevent the default action:

```js
handleTextChange: e => text => {
  e.preventDefault()
  setText(text)
}
```

### 3. Store

The Store is the local, application version of the databases. It's good to keep a copy of your databases in JavaScript for quick loading and rendering. In YVideo, we use Redux and Redux Thunk to accomplish this.

#### Flux Pattern

Redux is built on what's called the "Flux" pattern. Essentially, you have 3 important functions:

- Store

    This is the "database", sometimes referred to as Global State, or the "Single Source of Truth" for your application. When you need some data, you can find it here.

- Actions

    When you need to modify the Store, you use Actions to do it. An action is a basic JavaScript object that looks like this:

    ```js
    {
      type: FETCH_SUCCESS,
      payload: {
        // some data
      },
      error: null
    }
    ```

    The `type` is a constant, which just references a string. The `payload` and `error` objects may not be necessary, but are there in case there is data associated with the action. In actions that don't need a payload or an error, you can safely omit those variables from the action.

    To call this action, you will use the `dispatch` method, which is exposed in specific places, and which will in turn call the appropriate reducer to update the database.

- Reducer

    You may have noticed that an Action is just a plain object, and you may have wondered how that's supposed to change the database. The answer is through Reducers. A reducer is basically a big `switch` statement on an action's `type`. A very basic reducer may look like this:

    ```js
    import initialStore from 'store'

    const dataReducer = (store = initialStore, action) => {
      switch(action.type) {
        case FETCH_START:
          return {
            ...store,
            loading: true
          }

        case FETCH_SUCCESS:
          return {
            ...store,
            loading: false
            data: action.payload
          }

        case FETCH_ERROR:
          return {
            ...store,
            loading: false,
            error: action.error
          }

        default:
          return store

      }
    }
    ```

    Redux takes care of calling the reducer function when you dispatch an action.

#### Thunk

A "Thunk" is defined as a subroutine that runs within a subroutine, or a function that runs within a function. In this context, we use the package `redux-thunk` to help us make asynchronous calls to our databases. A typical thunk returns an `async` function, and takes in a few arguments:

```js
const fetchData = url => async (dispatch, getState, services) => {
  dispatch({ type: FETCH_START })

  try {
    const payload = await fetch(url).then(r => r.json())
    dispatch({ type: FETCH_SUCCESS, payload })
  } catch(error) {
    dispatch({ type: FETCH_ERROR, error })
  }
}
```

In YVideo, thunks will be found in our Services, which are imported into our Containers in order to access and manipulate data.

### 4. Services

Services are what handle most of the underlying computation and data requests. An example of a service could be one that handles everything that has to do with Authentication. This service would have methods such as, but not limited to:

- `login(username, password)`
- `logout()`
- `register(username, password, email)`
- `isAuthenticated()`

In YVideo, there are services that handle the Resource Library, the YVideo Backend, and other areas of functionality. These functions will all be in the form of a Thunk, which was explained above.

In general, any service should adhere to the following principles:

- **Simplicity**

    A service should be kept as simple as possible while still implementing the required functionality

- **DRY (Don't Repeat Yourself)**

    Self explanatory, if you find yourself copy-pasting a lot, you can probably make a function that will take the variables as parameters and return the proper result

- **Single Responsibility**

    Self explanatory, one service should be in charge of one thing

- **Minimize Dependencies**

    A more advanced concept, but the easiest way to adhere to this is to minimize use of the `new` keyword, which can be done through "Dependency Injection"

#### Use with React

Thanks to the `react-redux` npm package, we have access to a "High Order Function" (HOF) called `connect()()`, where the first set of parameters will include `mapStateToProps` and `mapDispatchToProps`, and the second set of parameters takes your react component. The HOF will stick anything in those first two objects into the `props` variable on your component, which is how your component uses Redux. A typical use of `connect()()` looks like this:

```js
import React from 'react'
import { connect } from 'react-redux'
import { DataService } from 'services'

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = {
  fetchData: DataService.fetchData
}

const AppContainer = props => {

  // deconstructing the `props` variable
  const { fetchData, data } = props

  // life cycle methods
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
```

As you can see, first you have to import the services that you want to use, and then you can map the specific functions (thunks) from that service to the `props` variable using `connect()()`.

### 5. Proxy

The "Proxy" pattern is when you have a class or module of your application that's sole purpose is to represent something that's remote. For example, if your application accesses an API via endpoints, you'll want to create a proxy called `apiProxy` that handles those interactions exclusively, essentially transforming endpoints to functions on a class. The only place you should use `fetch()` in YVideo is in some kind of proxy class.

# TODO

#### Behaviors for Each Role
	Students
		* Watch videos
	TAs
		* Manage:
			- Edit collections (Settings & Permissions: They can't add TAs)
			- Create (only links)
		* CaptionAider
		* Annotator
	Professors
		* TA Roles
		* Add TA to collection
	Lab Assistant
		* Manage content in a collection
		* Search content and add it to a collection
		* Create collection
		* LAs should be able to search collections so that they can add content to it
	Admin
		* Everything

### v0.1
1. Define the actions for the front end: How will people use this? What behaviors are MVP?

		MVP Behaviors
		* Students
			* Watch videos
		* TAs
			* Manage:
				- Edit collections (Settings & Permissions: They can't add TAs)
				- Create (only links)
		* Professors
			* TA Roles
			* Add TA to collection
		* Lab Assistant
			* Manage content in a collection
			* Search content and add it to a collection
			* Create collection
			* LAs should be able to search collections so that they can add content to it

2. Rewrite the Player in 100% React using the react-player library
	* Finish controls
	* Test MP4 file
	* Subtitles
	* Annotations (Side bar/menu)
	* Filters
3. Fix bugs in managing content, Fix bugs in permissions, make sure professors mp4 files can be viewed correctly

	* Adding resources to collection

### v0.2
1. Make sure all types of content can be viewed/edited properly
2. Rewrite CaptionAider in 100% React
3. Rewrite Annotator in 100% React
4. Add useful functionality to the Admin page

### v1.0
1. Rewrite the backend (databases, servers, etc.)
	* with getCollections(), add published to collections.content.published = true || false. This will take care of TODOs in CollectionsContaienr

* Rip YouTube mp4s