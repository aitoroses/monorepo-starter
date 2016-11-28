
# Scaffolding

Run the command `npm run scaffold` and you will be able to generate code


## Creating the redux state files

For creating files for Redux (reducer, actions, constants...) type ```npm run scaffold``` and select the **ReduxState** generator. It will ask for the state segment name.

In this case, we will provide the name **todos** to that question and it will create the following files:

- /src/reducer/todos.ts
- /src/constants/Todos.ts
- /src/actions/todos.ts

The reducer will be imported directly into the root reducer in the **todos** key.

## Creating a container component file

For creating a container component select **Container** generator. It will ask for the name of the file.

As an example, providing the name **TodosView** it will create the file "/src/containers/TodosView.tsx"

> We can use a lot of forms of that name, "todos view", "todos_view"... it will use the proper name for each file in each case

## Attaching a container to a route

We'll do this with the **Route** generator. It will ask for the name of the file.

The generator will require the path of the route and the container to import, so, path **/todos** and component **TodosView** will import the TodosView and set the route /todos for displaying that component.
