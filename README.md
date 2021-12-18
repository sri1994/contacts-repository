# ContactsListApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.5 as a part of practical assignment from Encora for evaluation of Candidate named `Srinivas Prasad`.

## Get Started

### Clone the repo

```shell
git clone https://github.com/sri1994/contacts-repository.git
Run `cd contacts-list-app` and get into the contacts-list-app directory where project source code wil be present.
```

### Install npm packages

Make sure node (v13.0 or above) is installed and npm is available.
Install the `npm` packages described in the `package.json` and verify that it works:

```shell
Run `npm install`
Run `ng serve`
```

The `ng serve` command does JIT compilation of source code files, and runs `lite-server` on port `4200`.

If needed, Shut it down manually with `Ctrl-C` and enter 'Y' to proceed.

### Expectations from application

Application is able to get the list of available contacts from GET API (`https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts`). User should be able to perform operations like Delete, Edit and Add with the data available without having to call any API. All these functions can be performed in the application. On refresh, application makes API call again to get the original list of contacts. (Add, delete and Update/Edit is done only at client side i.e., local browser environment and these won't impact data stored at server).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. (Note: for Development purpose).

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

- `npm test --code-coverage` - builds the application and runs unit test cases. After it builds, coverage reports can be found in ../contacts-list-app/coverage/contacts-list-app/index.html directory. This file can be opened in browser and it provides insight on each spec file and percentage of coverage w.r.t unit testing.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Techniques

### Modules

Application is modularised for scalability. There is a modules folder in the src folder.It consists of modules like feature-contacts-list , data-access-contacts-list that serves as feature module and service module (For Data accessing via API). There is a separation of concern for this. If any new feature is required, we can continue with this model. This helps in easy maintainance of code without much chaos. App module will serve as base bootstrap module. All other modules will come into Modules folder.

### Components Resusability

There are some component available (Eg. ContactsFormModalComponent ) that is resusable in both Edit contact and delete contact.

### Data Service Separation

A new module is created for handling data service. If at all any new API needs to be integrated, it can be done here. If state management Ngrx store implementation is required, there is a scope to do in this module and export necessary methods from here for the components to use.

### Ngx-Bootstrap

ngx-bootstrap npm package has been utilized to handle the styling of the web page and modal service is used from that.

### Unit testing

Services and component methods have been mocked whereever it is required. Unit tests cover upto 87% of source code available.
