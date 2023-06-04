<template>
    <q-tooltip
        class="tooltip"
        :class="`tooltip-arrow-${ arrow }`"
    >
        <div class="tooltip-text bg-grey-7 text-subtitle1 text-bold relative-position">
            <slot />
        </div>
        <div class="tooltip-arrow bg-grey-7 absolute">
        </div>
    </q-tooltip>
</template>

<script>
import { computed } from 'vue'

export default ({
    props: {
        arrow: {
        type: String,
        default: 'top'
        },
    },
    setup(props) {
      const arrowClass = computed(() => {
        let arrowClassCorrected = props.arrow.replace(' ', '-')
        let allowedClasses = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom']
        if (!allowedClasses.includes(arrowClassCorrected)) {
          console.error(`Value "${ arrowClassCorrected }" not allowed for "arrow" prop. Use one of these: `, allowedClasses)
          return 'top'
        }

        return arrowClassCorrected
      })

      return {
          arrowClass
      }
    }
})
</script>

<style lang="scss">
$box-shadow: 0 0 30px rgba(0, 0, 0, 0.544);

.tooltip {
    box-shadow: $box-shadow;
    overflow: visible;
    background: transparent;
    padding: 0;
    border-radius: 5px;
    //text style
    &-text {
        z-index: 10;
        border-radius: 5px;
        padding: 20px;
    }
    //arrow positioning
    &-arrow {
        z-index: 5;
        box-shadow: $box-shadow;        
        width: 30px;
        height: 30px;
        transform: 
            translateX(-50%) 
            rotate(-45deg)
            skew(-20deg, -20deg);
   // top arrows
    [class*="tooltip-arrow-top"] & {
      top: 0px;
    }
        .tooltip-arrow-top & {
        left: 50%;
        }
        .tooltip-arrow-top-left & {
        left: 30px;
        }
        .tooltip-arrow-top-right & {
        right: 0px;
        }

    // bottom arrows
    [class*="tooltip-arrow-bottom"] & {
      bottom: 0px;
    }
        .tooltip-arrow-bottom & {
        left: 50%;
        }
        .tooltip-arrow-bottom-left & {
        left: 30px;
        }
        .tooltip-arrow-bottom-right & {
        right: 0px;
        }

    // left arrows
    [class*="tooltip-arrow-left"] & {
      transform: translateY(-50%) rotate(45deg) skew(-20deg, -20deg);
      left: 0px;
    }
        .tooltip-arrow-left & {
        top: 50%;
        }
        .tooltip-arrow-left-top & {
        top: 20px;
        }
        .tooltip-arrow-left-bottom & {
        bottom: -10px;
        }

    // right arrows
    [class*="tooltip-arrow-right"] & {
      transform: translateY(-50%) rotate(45deg) skew(-20deg, -20deg);
      right: 0px;
    }
        .tooltip-arrow-right & {
        top: 50%;
        }
        .tooltip-arrow-right-top & {
        top: 20px;
        }
        .tooltip-arrow-right-bottom & {
        bottom: -10px;
        }
    }
}
</style>
