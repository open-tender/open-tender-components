# `@open-tender/components`

A component library for use with the Open Tender open source web app: [open-tender-web](https://github.com/open-tender/open-tender-web).

This library is only relevant for restaurant brands that are customers of Open Tender. To learn more about establishing an Open Tender account, [please visit our website](https://www.opentender.io/).

## Installation

Install via yarn:

```
yarn add @open-tender/components
```

Or via npm

```
npm install --save @open-tender/components
```

## Purpose

This library handles some of the most complex components featured in the Open Tender web app, including:

- button variations that come preconfigured with a brand's styles
- map and autocomplete components for Google Maps
- a menu item builder and its constituent components
- all forms, including a highly complex `<CheckoutForm />`

The benefits of using this libray are many:

- all components come with a restaurant brand's configured styles (which are passed down via [an Emotion theme](https://emotion.sh/docs/theming) from the Open Tender web app)
- forms, in general, are annoying, especially in React
- the `<CheckoutForm />` is super complex based on the flexibility of the Open Tender platform around different tender types, service charges, discounts, promo codes, gift cards, loyalty points, etc.
- the menu item `<Builder />` used to associated modifiers with a menu item handles a fairly complex set of rules across one or more modifier groups
- Google Maps can be a pain to work with

These are all very important components, and if you leverage this library, you can drop them in and they all just work.

In addition, many of the components have been decoupled into custom hooks and presentational components so you can customize the presentation while getting all the complex functionality "for free" (the `useBuilder` custom hook is a prime example, and all of the forms are implemented this way).

In general, this library is designed to handle the hard stuff for you, so you can focus on the fun parts of designing and building a customized user experience.

## Theme Support via Emotion

This library leverages [Emotion](https://emotion.sh/docs/introduction) for CSS-in-JS styled components and theme support via the `@emotion/react` and `@emotion/styled` packages (which are installed in the `open-tender-web` app).

The theme is passed down by the `open-tender-web` app, and you can read more about how this works via the [Styling with Emotion](https://github.com/open-tender/open-tender-web#styling-via-emotion-for-css-in-js--theme-support) section of the `open-tender-web` readme.

The punchline here is that all of these components come with a brand's styles built-in, which is helpful for things like buttons that come in four different variations.

## Usage

### Buttons

As noted above, one of the most common uses of this library in the `open-tender-web` app is for button variations. A brand can configure four different types of buttons that come in one of four possible color combinations. Here's an example:

```javascript
import { ButtonStyled } from '@open-tender/components'
```

```javascript
<ButtonStyled
  icon={<Home size={null} />}
  onClick={() => history.push('/')}
  size="big"
  color="secondary"
>
  Home
</ButtonStyled>
```

In this case, we're using the "big" button type and the "secondary" color scheme. You can see all of the possibilities in the `buttons` attribute of the [example theme](https://github.com/open-tender/open-tender-web/blob/main/THEME.md).

### Forms

Here's an example of using a form component:

```javascript
import { ProfileForm } from '@open-tender/components'
```

```javascript
const AccountProfile = () => {
  const dispatch = useDispatch()
  const { profile, loading, error } = useSelector(selectCustomer)
  const update = useCallback(
    (data) => dispatch(updateCustomer(data)),
    [dispatch]
  )

  return (
    <ProfileForm
      profile={profile}
      loading={loading}
      error={error}
      update={update}
    />
  )
}
```

As you can see above, the form receives data and a dispatch function from the `open-tender-web` app, and all of the inputs, error handling, etc. is handled by the `<ProfileForm />` component. So you don't need to worry about creating all of the different inputs and handling user input - the inputs will automatically come with the brand's configured styles. Here's an example of what this form looks like:

![image](https://s3.amazonaws.com/betterboh/u/img/prod/2/1626320612_open-tender-profile-form.png)

Pretty complex, but all of the inputs are styled for you via the theme, which is configured by the brand in the Open Tender Admin Portal:

![image](https://s3.amazonaws.com/betterboh/u/img/prod/2/1626320851_open-tender-admin-portal_input-styles.png)

If you want to customize the inputs beyond what comes with the theme styles, then you can use the `useProfileForm` custom hook and build the inputs and form yourself, following the example of the `<ProfileForm />` component in this library.

### More Examples

You can see many more examples in the [`open-tender-web` app](https://github.com/open-tender/open-tender-web) itself.

## Issues

If you find a bug or have a question, please file an issue on [our issue tracker on GitHub](https://github.com/open-tender/open-tender-web/issues).

## Credits

Built and maintained by [Open Tender](https://staging.opentender.io/).
