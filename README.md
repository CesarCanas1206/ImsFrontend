# Initial setup for working with this repo

A guide with some set up information for the IDE is up at [Setting up VS Code](https://gitlab.com/imscomply/ims-app/app/-/issues/1)

[Basic overview video showing how to get started](https://www.loom.com/share/bd3b82860d6a4051891ac14ca488a442)

# IMS App

`npm start` - run on port 3000, open to the `bookings` sub directory [http://localhost:3000/bookings](http://localhost:3000/bookings)

### API

The API is located at `https://apps.imscomply.com.au/ims-api`.\
It will adjust the database connection based on the directory that the application is running from.

The API is developed with the `Laravel` framwork and connects to a `MySQL` database.

### Components

The components have been separated into directory groups within the `src/components` directory.

The main groups are `Registry`, `UI`, `Preset`, `Form` and `Function`.\
Components within each group are related to those groups.

#### Component registry

The components are registered/added within the `src/components/Registry/componentRegistry.ts` file.
Components within here are set up to be lazy loaded only when used - reducing the size of the compiled scripts.

## How the program works

1. Loads settings for the program - `/setting`
1. Loads the pages (public only if not logged in) - `/page` or `/public-pages`
1. Loads the components for the current page - `/page/{id}/components`

The page shell is loaded, including the nav, side nav and content.

The main content area is loaded from the `JSON` returned in the component call. These are run through the `/components/DynamicComponent/DynamicComponent.tsx` component which loads the registry and passes the `props` into the loaded component.

An example of the components:

```json
[
  {
    "component": "DataGrid",
    "props": {
      "endpoint": "d/task",
      "columns": "[{\"name\":\"Name\",\"key\":\"name\",\"sub\":[{\"component\":\"Stack\",\"sub\":[{\"component\":\"Text\",\"props\":{\"text\":\"{name}\"}},{\"component\":\"Text\",\"props\":{\"text\":\"{description}\"}}]}]},{\"name\":\"Description\",\"key\":\"description\"},{\"name\":\"Status\",\"key\":\"status\",\"sub\":[{\"component\":\"StatusToggle\"}]},{\"name\":\"Actions\",\"key\":\"action\",\"sub\":[{\"component\":\"Group\",\"sub\":[{\"component\":\"ModalButton\",\"props\":{\"icon\":\"edit\"},\"sub\":[{\"component\":\"Form\",\"props\":{\"formId\":\"task\",\"itemId\":\"{id}\"}}]},{\"component\":\"DeleteButton\"}],\"props\":{}}]}]"
    },
    "sub": [
      {
        "component": "Group",
        "props": {
          "position": "right"
        },
        "sub": [
          {
            "component": "ModalButton",
            "props": {
              "icon": "add",
              "text": "Add new"
            },
            "sub": [
              {
                "component": "Form",
                "props": {
                  "formId": "task"
                }
              }
            ]
          },
          {
            "component": "Space",
            "props": {
              "h": "sm"
            }
          }
        ]
      }
    ]
  }
]
```

This setup will load the `DataGrid` component and load the data from `d/task` and setup the `columns` (also with their own components within the columns).

The `DataGrid` component is set up to display the `children` (`sub`) components above the main table. This will work recursively and load each of the child components within each parent.
