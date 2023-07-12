# IMS App Overview

## Setup

Background: The IMS App is a new version of the IMS bookings program - which there are many of.
The main aim of the new IMS app is to bring it all into one codebase and allow for easily sharing functionality between programs and making it easier to work with.

> Note: This is the largest React project that IMS has worked on, some of the structures and methods may not be 100% ideal but the plan is to update and improve as we go to make sure we are doing things better and reducing code complexity.

To get the project repository into your working directory - `git clone git@gitlab.com:imscomplyb/ims-app.git`

## Structure

The current structure of the app is set up to go through the following files/components (relative to `src` directory):

- `index.ts`
- `context/AppContextProvider.tsx`
- `App.tsx`
- `context/PageContextProvider.tsx` (which loads a the pages from the `registry/pageRegistry.ts` file)
- `layout/DefaultLayout.tsx`
- All of the pages are then mapped to `layout/ProtectedRoute.tsx`
- Then the page components are loaded (either from the api or the registry) and then run through `component/DynamicComponent.tsx`

## Running the project

Then run the project - `npm start` - this will also run `npm install`.

The application will run on port 5173 by default - `http://localhost:5173` - this is set up using Vite.

The app requires a client directory in order to work - this is sent to the API to know which database to connect to.

- Add the client directory to the url to access the app e.g. `http://localhost:5173/imstest`

> Note: If the client directory does not have a database, it will just fail to load on the page.

## Config

The main config settings used in the program are:
| Setting | Name | Description |
| -------- | -------- | -------- |
| logo | Logo | The logo that shows in the top left of the app |
| login-logo | Login Logo | The logo that shows on the login page |
| modules | Modules | The modules that are enabled for this program |
| live_email | Live Email | Whether live emails will be sent - if not then the test_email is used |
| test_email | Test Email | The email address that test emails are sent to |

The config settings are loaded in the `PageContextProvider` component from the `initialise` call (only public settings).
Once the settings are pulled down, they are set in the `AppContext` - accessible from the `AppContextProvider`.

From any component, settings can be accessed by `const { settings } = useContext(AppContext);` and then `settings.logo` for example.

Basic overview video of settings - https://www.loom.com/share/ff4d746df63c42f5ae0ff5a468d77176

## Pages

The main part of the program is the pages - which are loaded in from the API or the registry.
Pages in the code are in the `app/{page-path}/page.ts` file.

The pages are loaded from the `pageRegistry` which builds an array from all the `page.ts` files in the `app/` directory.

These contain an exported object with the following properties:

| Property   | Description                                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| id         | the id of the page (UUID), used to identify the page when created in the database or used for a parent_id               |
| parent_id  | the id of the page this sits under (mainly used for showing in the sub menu)                                            |
| name       | the name of the page that shows in the `PageTitle` component and in the title                                           |
| path       | the path of the page - this can include params e.g. `testpage/:id` and the params are retried from the `useParams` hook |
| icon       | the icon for the page on the menu - a full list of icons can be seen by going to `component/IconList`                   |
| components | the array of component objects with the structure of `{ component, props, sub }` (with sub being children)              |
| show       | `0` for hidden, `1` for on top menu, `2` for on side menu                                                               |
| order      | the numeric order of the menu item                                                                                      |
| category   | a category name - for internal reference only currently                                                                 |
| module     | the name of a module that this page will show for if turned on                                                          |
| permission | the name of a permission that is required to view this page                                                             |

Overview video of pages with how the ordering, permission and modules work - https://www.loom.com/share/dd12f4df4a624687949f41e6e9956061

**Pages and permissions**
Pages can be set to show on a particular permission by setting the `permission` property to the name of the permission.

```
{
  ...
  permission: 'admin'
}
```

This will enable the page only for users who have the `admin` permission.

Overview video of pages with how the ordering, permission and modules work - https://www.loom.com/share/dd12f4df4a624687949f41e6e9956061

## Components

The components have been separated into directory groups within the `src/components` directory.
The main groups are `Registry`, `UI`, `Preset`, `Form` and `Function`.
Components within each group are related to those groups.

Most of the page components are run throught the `DynamicComponent` component which maps the given component name to the component in the registry and passes in the props.

An overview videos has been setup to cover how it works - https://www.loom.com/share/c050d97032614c0f872d4fc0287a7014

#### Component registry

The components are registered/added within the `src/components/Registry/componentRegistry.ts` file.
Components within here are set up to be lazy loaded only when used - reducing the size of the compiled scripts.

## Core

### Mantine

Mantine components are used throughout the app, further information can be found at - https://mantine.dev/

We have created a lot of these components locally for three main reasons:

1. For consistency - we can make sure that all of the components look and work the same - e.g. the onChange event for inputs can all have the same values/object passed in.
2. For flexibility - if we decided we didn't want to use the Mantine components anymore we can easily swap them out for something else without having to rewrite lots of different components.
3. To work with the dynamic components/component loader - the componentRegistry is generated from the components in the directory - by creating local versions of everything we use, they can be added in without having to do any manual work.

### useAPI

The useAPI hook is one of the key components used in the app as it interacts with the API.
It is located in `hooks/useAPI.ts` and exports out the various functions like `get`, `post`, `put`, `delete`.
The hook can be called and a different url passed in to point the API somewhere else, otherwise it uses the current client directory and sends that as a heading of `x-site-name` to the API to know which database to connect to.

## Preset

Preset components are components that have most of their functionality built in and aren't going to be used in other components - examples are: Login page, Booking list, Asset list.

These use the components in other directories and hooks to create the functionality.

## UI

A lot of the components in the UI directory are wrappers of Mantine components - like `Card`, `Badge`, `Alert` etc.
Some of the components are in the `components/Form` directory - these generally relate to the forms - like inputs, selects, buttons and similar - these can be moved around easily without breaking the dynamic component flow - as it just loads any `.tsx` file in the components directory.

## Forms

There is a main Form component - `components/Form/Form/Form.tsx` for loading forms from either the API or the registry.

The main properties that can be passed in are:
| Property | Description |
| -------- | -------- |
| formId | The id of the form to load - this can be a UUID or a reference to a form in the registry |
| itemId | The id of the item to load - this can also be `new` which will trigger adding a new item |
| defaultValues | The default values to load into the form as an object |
| sentValues | The values to load into the form as an object - these are able to be output on the form but won't save in the database |
| autosave | Whether autosaving is enabled (meaning the save button doesn't have to be pressed) |
| readOnly | Whether the form is read only |
| hideSave | Hiding the save button |
| showClose | Showing the close button (used to get the buttons next to each other on a modal) |
| onSave | A function to run after the form has been saved |
| after_save_redirect | A url to redirect to after the form has been saved |

## Email

The `components/function/SendEmail/SendEmail.tsx` component exports a function called `sendEmail` which can be used to send an email.

properties: template, data, row, replace
The input is an object with the following properties:
| Property | Description |
| -------- | -------- |
| template | The reference of the template to use |
| data | The data to use in the template - this includes the `to` addresses and could look something like this: |
| row | If referencing a row of data, this can be passed in to replace strings in the body of the email |
| replace | An object of strings to replace in the body of the email |

An example of the sendEmail function in use:

```ts
await sendEmail({
  template: 'booking_declined',
  data: {
    to: [{ email: hirer?.user?.email, name: hirer?.user?.name }],
  },
  replace: {
    test: 'Test value',
    details: 'To replace the details placeholder',
  },
  row: hirer,
})
```

The placeholder details can be wrapped in curly brackets to look like this: `{name}` (which will be replaced with `hirer.name` if exists).

If trying to send an email that doesn't have a template, the `body` and `subject` can be added to the `data` object which will be used instead of the template.

Basic example:

```ts
await sendEmail({
  data: {
    to: [{ email: hirer?.user?.email, name: hirer?.user?.name }],
    subject: 'Test subject',
    body: 'Test body',
  },
})
```

Overview of how they are working - https://www.loom.com/share/4ed720a897ee4c2d8cf0cb9a9d13ee62

### Emails - API Side

On the API side, the endpoint is `POST send-email` which runs the main function of `sendEmail` and will load the template (if in the database), replace strings in the body/subject and work out who to send the email to.

The email is sent individually to each recipient.

This runs through `SendGrid` and has the smtp settings in the `.env` file. If it needs to be changed, it can just point to another mail server and use different credentials.

PDFs - overview of using and sending - https://www.loom.com/share/f4af08cfb8aa49b79b8b60bd1c85c8b0

## Calendar

The calendar is running through `FullCalendar` and is located in `components/UI/Calendar/Calendar.tsx`.

Documentation for the FullCalendar plugin can be found at https://fullcalendar.io/docs/react

Calendar overview - https://www.loom.com/share/c6a587f976f8459696d104ec4272d628

Clashes overview (usage and calendar) - https://www.loom.com/share/f4b9f98712dd4f70b3fbceab2e581d23

## Crons

Cron jobs have not properly been set up yet but there are some test cron jobs in the `CronController` demonstrating basic emailing and building CSVs to email.

To trigger the cron jobs manually, just go to the API in the browser to this endpoint - `/cron/run?site-name={client}`

Cron jobs - setting up and using - https://www.loom.com/share/985137cab0384cfd89084b19209ab10a

## Pdfs

The app uses the `react-pdf` dependency to generate PDFs - https://react-pdf.org/

A basic component exists as `PDF` to demonstrate how to use it.

Basic overview of creating PDFs - https://www.loom.com/share/f4af08cfb8aa49b79b8b60bd1c85c8b0

## CSVs

CSVs are created in the app through the `react-csv` dependency - https://github.com/react-csv/react-csv#readme

A basic component exists as `CSV` to demonstrate how to use it.

Basic overview of creating CSVs - https://www.loom.com/share/78519415a4334dd6817d64b38c1730ed

## Storage - API

**files, images**

- stored in Azure Blob Storage

The setup for the Azure storage is in the `.env` file.

The main functions for interacting with the storage are in `app/traits/AzureBucketApi.php` and can be used to upload, download and delete files.

The trait is then included in the `FileController` and able to be run.

Azure storage - overview video - https://www.loom.com/share/19e47cac153a4c42b3ca9286ef75a90c

## Database

| Table                  | Description                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| asset                  | The assets table stores the assets that are uploaded to the program                             |
| asset_form             | Stores the joins of forms that the asset is able to inspect on                                  |
| booking                | The booking table stores the bookings that are made                                             |
| calendar               | The calendar table stores the calendar events                                                   |
| hirer                  | The hirer table stores the hirers that are able to book assets                                  |
| hirer_asset            | The hirer_asset table stores the joins of assets that the hirer is able to book                 |
| users                  | The users table stores the users that are able to log in                                        |
| collection             | The collection table stores various collections/psuedo tables that can be grouped by the `slug` |
| collection_field       | The collection_field table stores the fields that are linked to the collection                  |
| config                 | The config table stores the config settings for the program                                     |
| dataset                | The dataset table stores the datasets that are able to be used in the program                   |
| file                   | The file table stores the files that are uploaded to the program                                |
| form                   | The form table stores the forms that are able to be used in the program                         |
| form_question          | The form_question table stores the questions that are linked to the form                        |
| migrations             | The migrations table stores the migrations that have been run                                   |
| page                   | The page table stores the pages that are able to be used in the program                         |
| page_component         | The page_component table stores the components that are linked to the page                      |
| password_resets        | The password_resets table stores the password resets that have been requested                   |
| permission             | The permission table stores the permissions that are available in the program                   |
| personal_access_tokens | The personal_access_tokens table stores the access tokens                                       |
| role                   | The role table stores the roles that are available in the program                               |
| role_email             | The role_email table stores the emails that are linked to the role                              |
| role_permission        | The role_permission table stores the permissions that are linked to the role                    |
| schema                 | The schema table stores the schemas that are available in the program                           |
| usage                  | The usage table stores usage that is linked to bookings - calendar items are created from these |
| user_asset             | The user_asset table stores the joins of assets that the user is able to see                    |
| user_email             | The user_email table stores the emails that are linked to the user                              |
| user_permission        | The user_permission table stores the permissions that are linked to the user                    |

## migrations

Set up as standard Laravel migrations - endpoint created as `migrations` for the current program and `client-migrations` for all programs (manually added into list).

Video overview of migrations setup - https://www.loom.com/share/50d26e71250a48e58d949668cecc8554

## API

Setting up the API with an earlier version of PHP
https://www.loom.com/share/5672c22b79034a0f99b4858eadd8b53b

This covers:

- Getting the PHP version required and downloading it locally
- Making sure the extensions are correct for PHP
- Installing the dependencies for the API
- Adding the .env file
- Running a local server
- Testing that the API loads
- Running from the App

Setting up a new Model/Controller/Migration in the API and linking to the APP
https://www.loom.com/share/5f861066bc734ba8b73719019074cbd9

This covers:

- Setting up a new Controller/Model/Migration in the API
- Adding a resource route to the API
- Testing from the App to make sure it works

## Collections

The collections endpoints - `d/{slug}` are used to create pseudo tables that can be used to group data together.

This allows for data to be easily stored without having to create separate endpoints, models, controllers, migrations etc.

One example would be to post data to `d/support`, this would add a new item into the `collection` table and all the fields would be added to the `collection_field` table.

```
{
  "name": "Support item 1",
  "type": "Bug",
  "request": "I have a bug"
}
```

This would create a new item in the `collection` table, giving it a unique id, then it would create separate rows for `name`, `type` and `request` in the `collection_field` table - referencing the `collection_id` of the new item.
The column names of the fields go into the `reference` column of the `collection_field` table and the values go into the `value` column.

Then for retrieving items, we would just call `d/support` and it would return all the items in the `collection` table with the `slug` of `support`.
Specific items can be retrieved in the same way with `d/support/{id}`, which returns the item that matches the id.

The separate fields are then mapped to the `collection` item and returned as an object.

Pulling back a single result would mean the `name` could be accessed by `data.name` and the same with the rest.

## endpoints

The API has public routes - set up to be available to anyone without having to login, and the private routes - running through the authorisation.

These are grouped in the `routes/api.php` file.

Further details on the endpoints can be found at https://laravel.com/docs/10.x/routing

## authorization

The API uses `sanctum` for the authorisation - further details on this can be found at https://laravel.com/docs/10.x/sanctum

## Fees - how fees is working, am guessing this is going to be needed if a client goes live.

Fees basic overview - https://www.loom.com/share/1d176342ca1b43de91614e4578a3181e

## Data migration

We have data migration (generating SQL files from the old programs) set up for BrimbankCH, BrimbankCM, GlenEira, Monash and Warrnambool.

This is up at https://apps.imscomply.com.au/migrations/?v=123 where the program can be selected, then either individual parts (e.g. clubs) which outputs to a textarea or all of the migrations can be run.

The file that is generated lives at https://apps.imscomply.com.au/migrations/{site name}-queries.sql

## Videos

- Setting up the API to work on an older version of PHP - https://www.loom.com/share/5672c22b79034a0f99b4858eadd8b53b
- Creating an API endpoint, model and controller - https://www.loom.com/share/5f861066bc734ba8b73719019074cbd9
- Overview of the DynamicComponent component - https://www.loom.com/share/c050d97032614c0f872d4fc0287a7014
- Amotto program overview - https://www.loom.com/share/886246f045f54210ae0171564e2d89bf
- Pages - Modules and Permissions - https://www.loom.com/share/dd12f4df4a624687949f41e6e9956061
- Config settings - basic overview and usage - https://www.loom.com/share/ff4d746df63c42f5ae0ff5a468d77176
- CSVs and how to set them up - https://www.loom.com/share/78519415a4334dd6817d64b38c1730ed
- PDFs - overview of using and sending - https://www.loom.com/share/f4af08cfb8aa49b79b8b60bd1c85c8b0
- Azure storage - overview - https://www.loom.com/share/19e47cac153a4c42b3ca9286ef75a90c
- Cron jobs - setting up and using - https://www.loom.com/share/985137cab0384cfd89084b19209ab10a
- Emails - overview of how they are working - https://www.loom.com/share/4ed720a897ee4c2d8cf0cb9a9d13ee62
- Migrations - overview of setup - https://www.loom.com/share/50d26e71250a48e58d949668cecc8554
- Fees basic overview - https://www.loom.com/share/1d176342ca1b43de91614e4578a3181e
- Brimbank FatZebra current integration overview - https://www.loom.com/share/38fdd8349ece4cd9be39f5c41070c8a6
- Workflow overview - https://www.loom.com/share/8b737168a9094c50bcbd57b624e467b8
- Calendar overview - https://www.loom.com/share/c6a587f976f8459696d104ec4272d628
- Clashes overview (usage and calendar) - https://www.loom.com/share/f4b9f98712dd4f70b3fbceab2e581d23
