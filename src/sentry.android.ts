import { Common } from './sentry.common';
import * as application from 'tns-core-modules/application';
import * as utils from 'tns-core-modules/utils/utils';

declare var io: any;

export class Sentry extends Common {

    
    private static getErrorDetails(args: any): any {
        let error = args.android;
        if (!error || !error.nativeException) {
            return {
                name: error.name || 'Error',
                nativeException: error.nativeException,
                message: error.message || JSON.stringify(error),
                stackTrace: error.stackTrace || null,
                stack: error.stack || null
            };
        } else {
            return error.nativeException;
        }
    }

    public static init(dsn: string) {

        try {
            if(application.android) {

                application.android.on('activityStarted', (activityEventData)=> {
                    try {
                        io.sentry.Sentry.init(dsn, new io.sentry.android.AndroidSentryClientFactory(utils.ad.getApplicationContext()));
                    } catch(error) {
                        console.log('[Sentry - Android] Exeption on init: ', error);
                    }
                });

                application.on(application.uncaughtErrorEvent, args => {
                    io.sentry.Sentry.capture(this.getErrorDetails(args));
                    // if (!args.android) {
                    //     io.sentry.Sentry.capture(args);
                    // } else {
                    //     let event = new io.sentry.event.EventBuilder()
                    //           .withMessage(args.android.stackTrace)
                    //           .withLevel(io.sentry.event.Event.Level.FATAL);
                    //     io.sentry.Sentry.capture(event.build());
                    // }
                });
            }
        } catch(e){
            console.log('[Sentry - Android] Exeption on init: ', e);
        }
    }

    /**
     * capture
     */
    public static capture(error: any) {
        try {
            let event = new io.sentry.event.EventBuilder()
                .withMessage(error)
                .withLevel(io.sentry.event.Event.Level.ERROR);
            io.sentry.Sentry.capture(event.build());
        } catch (sentryError) {
            console.log('[Sentry - iOS] ORIGINAL ERROR:', error);
            console.log('[Sentry - Android] Exeption on capture: ', sentryError);
        }
    }
}
