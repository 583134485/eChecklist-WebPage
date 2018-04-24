import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const slideInDownAnimation: AnimationEntryMetadata =
    // 动画触发器名称
    trigger('slideInDownAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),

        state('void',
            style({
                opacity: 0,
                transform: 'translateX(-100%)'
            })
        ),

        transition('void => *', [
            // style({
            //   opacity: 0,
            //   transform: 'translateX(-100%)'
            // }),
            animate('1s ease-in')
        ]),

        transition('* => void', [
            // style({
            //   opacity: 1,
            //   transform: 'translateX(0%)'
            // }),
            animate('1s ease-in')
        ]),


        // transition('* => void', [
        //   animate('1s ease-out', style({
        //     opacity: 0,
        //     transform: 'translateY(100%)'
        //   }))
        // ])
    ]);

export const animation1: AnimationEntryMetadata =
    trigger('animation1', [
        state('*', style({ opacity: 1, })),
        state('void', style({ opacity: 0, height: '0px' })),
        transition('void => *', [

            animate('0.5s ease-in')
        ]),

        transition('* => void', [

            animate('0.5s cubic-bezier(0.25,-0.25,0.5,0.75)')
        ]),

    ]);
export const animation2: AnimationEntryMetadata =
    trigger('animation2', [
        state('*', style({ opacity: 1, transform: 'perspective(600px) rotateX(0deg)' })),
        state('void', style({ opacity: 0, height: '0px', transform: 'perspective(600px) rotateX(90deg)' })),

        transition('void => *', [

            animate('5s')/**ease-in */
        ]),

        transition('* => void', [

            animate('5s')
        ]),
        transition('* => lightBorder', [
            animate('0.5s ease-in', style({ 'box-shadow': '0 0 5px rgba(81, 203, 238, 1)' }))
        ])

    ]);
