module.exports = {
  packagerConfig: {
    osxSign: {
      hardenedRuntime: true,
      gatekeeperAssess: false,
      entitlements: './resources/entitlements.mac.plist',
      entitlementsInheritz: './resources/entitlements.mac.plist',
    },
    osxNotarize: {
      appBundleId: 'com.benatkin.ResourcesAlpha',
      appPath: './out/Resources-darwin-x64/Resources.app',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
    },
    appBundleId: 'com.benatkin.ResourcesAlpha',
    appCategoryType: 'public.app-category.developer-tools',
    icon: 'resources/icon',
    ignore: 'packages/desktop-bundle',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Resources',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
}
