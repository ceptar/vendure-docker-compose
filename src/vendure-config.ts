import { DefaultJobQueuePlugin, DefaultSearchPlugin, dummyPaymentHandler, VendureConfig, } from '@vendure/core';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { StripePlugin } from '@vendure/payments-plugin/package/stripe';
import { HardenPlugin } from '@vendure/harden-plugin';
import path from 'path';

const IS_DEV = process.env.APP_ENV === 'dev';
export const config: VendureConfig = {
    apiOptions: {
        hostname: '0.0.0.0',
        port: 3000,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
    },
    authOptions: {
        disableAuth: false,
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: 'superadmin',
            password: 'redubash',
        },
        cookieOptions: {
            secret: 'awdbhbjahdbaw',
            sameSite: 'strict',
        }
    },   
    dbConnectionOptions: {
        type: 'postgres',
        synchronize: false, // turn this off for production
        logging: false,
        database: 'vendurezwei',
        host: '172.17.0.1',
        port: 5432,
        username: 'postgres',
        password: 'aergsgd5sgdr',
        migrations: [path.join(__dirname, '../migrations/*.ts')],
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    customFields: {},
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            assetUrlPrefix: 'https://discobabes.store/assets/',
            }),
        DefaultJobQueuePlugin,
        DefaultSearchPlugin,
        AdminUiPlugin.init({
            route: 'admin',
            port: 3002,
              }),
        EmailPlugin.init({
            route: 'mailbox',
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        HardenPlugin.init({
            maxQueryComplexity: 1000,
            apiMode: IS_DEV ? 'dev' : 'prod',
          }),
        StripePlugin.init({
            storeCustomersInStripe: true,
            })
        ],
};
