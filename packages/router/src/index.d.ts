import type React from 'react'

declare module '@redwoodjs/router' {
  type namedRoute = string

  interface AvailableRoutes {}
  const routes: AvailableRoutes

  const Route: React.FunctionComponent<{
    /** The URL path to match, starting with the beginning slash */
    path: string
    /** The Page component to render when the path is matched. */
    page: React.ReactElement
    /** Used to specify the name of the _named route function_ */
    name: namedRoute
    redirect?: namedRoute
    /** The route marked notfound is displayed when a page can not be found */
    notfound?: boolean
  }>

  /**
   * Some pages should only be visible to authenticated users.
   * All `<Routes />` nested in `<Private>` require authentication.
   */
  const Private: React.FunctionComponent<{
    /**
     * When a user is not authenticated or is not assigned a role
     * and attempts to visit a route within private,
     * they will be redirected to the route name passed to `unauthenticated`.
     */
    unauthenticated: namedRoute
    role?: string | string[]
    children: Array<typeof Route>
  }>

  const Router: React.FunctionComponent<{
    children: Array<typeof Route | typeof Private>
    // TODO: paramTypes
    // TODO: pageLoadingDelay
  }>

  /**
   * Programmatically navigate to a different page.
   *
   * @example
   * ```js
   * // SomePage.js
   * import { navigate, routes } from '@redwoodjs/router'
   *
   * const SomePage = () => (
   *  <Button
   *    onClick={() => navigate(route.home())}>
   *      Click me
   *  </Button>
   * )
   * ```
   */
  function navigate(nameOfRoute: namedRoute)

  /**
   * If you want to declaratively redirect to a different page,
   * use the `<Redirect>` component.
   * @example
   * ```js
   * // SomePage.js
   * import { Redirect, routes } from '@redwoodjs/router'
   *
   * const SomePage = () => {
   *   <Redirect to={routes.home()}/>
   * }
   * ```
   **/
  const Redirect: React.FunctionComponent<{ to: namedRoute }>

  /**
   * When it comes to routing, matching URLs to Pages is only half the equation.
   * The other half is generating links to your pages.
   * Redwood makes this really simple without having to hardcode URL paths.
   *
   * @example
   * ```js
   * // SomePage.js
   * import { Link, routes } from '@redwoodjs/router'
   *
   * // Given the route in the last section, this produces: <a href="/">
   * const SomePage = () => <Link to={routes.home()} />
   * ```
   */
  const Link: React.FunctionComponent<{ to: namedRoute }>
  const route: any

  const useLocation: any
  const useParams: any
  const useMatch: any
  const usePageLoadingContext: any
}
