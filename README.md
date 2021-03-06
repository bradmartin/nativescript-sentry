# Sentry.io for NativeScript

[![npm](https://img.shields.io/npm/v/nativescript-sentry.svg)](https://www.npmjs.com/package/nativescript-sentry)
[![npm](https://img.shields.io/npm/dt/nativescript-sentry.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-sentry)

:construction: **Work in progress**

This package was forked from the unmaintained package
[danielgek/nativescript-sentry](https://github.com/danielgek/nativescript-sentry). We are currently
cleaning up and updating the code.

---

This plugin uses sentry-android and sentry-cocoa to catch native errors/stack traces and send them to a sentry server.

**NOTE:** If you have a **native exeption** and the app exits the plugin will save the log and send it in the **next app startup**, this is how the native plugins are implemented and it is expected behavior

#### Android SLF4J Log Error

> Sentry has an optional dependency on SLF4J on Android.
> Which when not present will log an error about it not being in the application.
>
> ```
> System.err: SLF4J: Failed to load class >"org.slf4j.impl.StaticLoggerBinder".
> System.err: SLF4J: Defaulting to no-operation (NOP) logger implementation
> System.err: SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder >for further details.
> ```
>
> To get rid of this log warning you can add a dependency to your app's app.gradle file located in `App_Resources/Android/app.gradle` to include:
>
> ```
>  compile 'org.slf4j:slf4j-nop:1.7.25'
> ```
>
> in the dependencies. See the demo app [here](/demo/app/App_Resources/Android/app.gradle)

# Installation

```javascript
tns plugin add nativescript-sentry
```

# Config

### Android
Starting with the version 1.10.0 it is no longer sufficient to call `Sentry.init(dsn)` on Android. This is caused by the changed init method introduced in `sentry-android:2.0.0` which expects a lambda function which cannot be implemented in NativeScript (or I did not find the right way yet).

Instead add the following line to your `AndroidManifest.xml` within the `<application>-tag`:
```
<meta-data android:name="io.sentry.dsn" android:value="__YOUR_DSN_HERE__" />
```

### Without Angular

```typescript
import { Sentry } from 'nativescript-sentry';
const dsn = 'https://<key>:<secret>@host/<project>';
Sentry.init(dsn);
```

### With Angular

```typescript
import { SentryModule } from 'nativescript-sentry/angular';

NgModule({
  ...
  imports: [
       SentryModule.forRoot({dsn: 'https://<key>:<secret>@host/<project>'})
  ],

```

**Note:** this plugin adds a custom ErrorHandler to your angular app

# API

#### Capture Exception

```typescript
Sentry.captureException(exeption: Error, options?: ExceptionOptions);
```

Example:

```typescript
try {
  throw 'try catch Exception example';
} catch (error) {
  Sentry.captureException(error, {});
}
```

#### Capture Message

```typescript
Sentry.captureMessage(message: string, options?: MessageOptions)
```

#### Capture BreadCrumb

```typescript
Sentry.captureBreadcrumb(breadcrumb: BreadCrumb)
```

#### Set Context user

```typescript
Sentry.setContextUser(user: SentryUser)
```

#### Context Tags

```typescript
Sentry.setContextTags(tags: object)
```

#### Context Extra

```typescript
Sentry.setContextExtra(extra: object)
```

#### Clear context

```typescript
Sentry.clearContext();
```

## Enums

```typescript
export enum Level {
  Fatal = 'fatal',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Debug = 'debug'
}
```

## Interfaces

```typescript
export interface SentryUser {
  id: string;
  email?: string;
  username?: string;
}

export interface BreadCrumb {
  message: string;
  category: string;
  level: Level;
}

export interface MessageOptions {
  level?: Level;

  /**
   * Object of additional Key/value pairs which generate breakdowns charts and search filters.
   */
  tags?: object;

  /**
   * Object of unstructured data which is stored with events.
   */
  extra?: object;
}

export interface ExceptionOptions {
  /**
   * Object of additional Key/value pairs which generate breakdowns charts and search filters in Sentry.
   */
  tags?: object;

  /**
   * Object of unstructured data which is stored with events.
   */
  extra?: object;
}
```

### Next features:

- callback for events

## Changelog:

**17/4/2020 - (1.10.2):**

- Fix GitHub Workflow to use existing publishing scripts

**17/4/2020 - (1.10.1):**

- Set up GitHub Workflow for npm publising

**15/4/2020 - (1.10.0):**

- Bumps to latest native SDK releases
- Stringifies data before writing it to Extras (Android)

**2/2/2019 - (1.8.0):**

- bumps to latest native SDK releases
- implements improved data converter(#22)
- adds data to SentryUser

Thanks to **@bradmartin** and **@jerbob92**!

**28/11/2018 - (1.6.1):**

- back to native approach thanks to **@bradmartin**
- update dependencies
- update test app
- working native breadcrums for ios
- fix dsn init thanks to **@kvnvelasco**

**11/12/2017 - (1.5.0):**

**BREAKING CHANGES**

- `capture()` method was deprecated in favor of `captureMessage`/`captureException`

**Features**

- Moving to an hybrid approach with both clients(web/native)
- breadcrums
- tags
- user info
- set tags and extra for each event

**28-08-2017 - (1.3.0):**

- fix Aot compilation for angular apps
- fix typos thanks to @muratcorlu

**2-08-2017 - (1.2.0):**

- update demos dependencies
- update ios and android native dependencies
- fix ios event capture

**24-07-2017 - (1.1.0):**

- fix stringify
- fix angular error handler

## Credits

- **@danielgek**: for being the original author of this plugin **[danielgek/nativescript-sentry](https://github.com/danielgek/nativescript-sentry)**
- **@hypery2k**: for his **nativescript-fabric** (helped the original author a lot!)
