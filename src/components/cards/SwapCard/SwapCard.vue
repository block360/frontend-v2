<template>
  <div>
    <div class="tabs">
      <nav>
        <ul>
          <li :class="$route.name != 'tracking' ? 'tab-current' : ''">
            <router-link to="/">
              <span>{{ $t('Swap') }}</span>
            </router-link>
          </li>
          <li :class="$route.name == 'tracking' ? 'tab-current' : ''"></li>
        </ul>
      </nav>
    </div>
    <BalCard class="card-container">
      <!-- <template #header>
      <div class="flex justify-between items-center w-full">
        <h4></h4>
        <SwapSettingsPopover
          :context="SwapSettingsContext.swap"
          :isGasless="swapping.swapGasless.value"
        />
      </div>
    </template> -->
      <div>
        <SwapPair
          v-model:tokenInAmount="tokenInAmount"
          v-model:tokenInAddress="tokenInAddress"
          v-model:tokenOutAmount="tokenOutAmount"
          v-model:tokenOutAddress="tokenOutAddress"
          v-model:exactIn="exactIn"
          :swapLoading="
            swapping.isBalancerSwap.value ? swapping.isLoading.value : false
          "
          :effectivePriceMessage="swapping.effectivePriceMessage"
          class="mt-0 mb-4"
          @amount-change="swapping.handleAmountChange"
        />
        <BalAlert
          v-if="error"
          class="p-3 mb-4"
          type="error"
          size="sm"
          :title="error.header"
          :description="error.body"
          :actionLabel="error.label"
          block
          @action-click="handleErrorButtonClick"
        />
        <BalAlert
          v-else-if="warning"
          class="p-3 mb-4"
          type="warning"
          size="sm"
          :title="warning.header"
          :description="warning.body"
          block
        />
        <BalBtn
          v-if="swapping.isLoading.value"
          loading
          disabled
          :loadingLabel="
            swapping.isCowswapSwap.value
              ? $t('loadingBestPrice')
              : $t('loading')
          "
          block
          class="swap-button"
        />
        <BalBtn
          v-else
          :label="$t('swap')"
          :disabled="swapDisabled"
          block
          class="swap-button"
          @click.prevent="handlePreviewButton"
        />
        <hr class="divider" />

        <div style="font-size: 14px; font-weight: 900">
          {{
            appNetworkConfig?.chainId === 1
              ? 'Swap fee  0.001 ETH'
              : 'Swap fee  0 ETH'
          }}
        </div>

        <!-- <div
          v-if="swapping.isCowswapSupportedOnNetwork.value"
          class="flex items-center mt-5 h-8 text-sm"
        > -->
        <!-- <Transition name="fade" mode="out-in">
            <div
              v-if="swapping.isGaslessSwappingDisabled.value"
              class="text-secondary"
            >
              <div class="flex gap-2 items-center">
                <span class="text-lg">⛽</span>
                <Transition name="fade" mode="out-in">
                  <p v-if="swapping.isWrap.value">
                    {{ $t('swapToggle.wrapEth') }}
                  </p>
                  <p v-else-if="swapping.isUnwrap.value">
                    {{ $t('swapToggle.unwrapEth') }}
                  </p>
                  <p v-else>
                    {{ $t('swapToggle.fromEth') }}
                  </p>
                </Transition>
              </div>
            </div>

            <div v-else>
              <div class="flex items-center swap-gasless">
                <BalTooltip
                  width="64"
                  :disabled="!swapping.isGaslessSwappingDisabled.value"
                >
                  <template #activator>
                    <BalToggle
                      name="swapGasless"
                      :checked="swapping.swapGasless.value"
                      :disabled="swapping.isGaslessSwappingDisabled.value"
                      @toggle="swapping.toggleSwapGasless"
                    />
                  </template>
                  <div
                    v-text="
                      swapping.isWrapUnwrapSwap.value
                        ? $t('swapGaslessToggle.disabledTooltip.wrapUnwrap')
                        : $t('swapGaslessToggle.disabledTooltip.eth')
                    "
                  />
                </BalTooltip>
                <Transition name="fade" mode="out-in">
                  <span
                    v-if="swapping.swapGasless.value"
                    class="pl-2 text-sm text-gray-600 dark:text-gray-400"
                    >{{ $t('swapToggle.swapGasless') }}</span
                  >
                  <span
                    v-else
                    class="pl-2 text-sm text-gray-600 dark:text-gray-400"
                    >{{ $t('swapToggle.swapWithGas') }}</span
                  >
                </Transition>
                <BalTooltip width="64">
                  <template #activator>
                    <BalIcon
                      name="info"
                      size="xs"
                      class="flex ml-1 text-gray-400"
                    />
                  </template>
                  <div v-html="$t('swapGaslessToggle.tooltip')" />
                </BalTooltip>
              </div>
            </div>
          </Transition> -->
        <!-- </div> -->
        <!-- <SwapRoute
          v-if="alwaysShowRoutes"
          :addressIn="swapping.tokenIn.value.address"
          :amountIn="swapping.tokenInAmountInput.value"
          :addressOut="swapping.tokenOut.value.address"
          :amountOut="swapping.tokenOutAmountInput.value"
          :pools="pools"
          :sorReturn="swapping.sor.sorReturn.value"
          class="mt-4"
        /> -->
      </div>
    </BalCard>
  </div>

  <teleport to="#modal">
    <SwapPreviewModal
      v-if="modalSwapPreviewIsOpen"
      :swapping="swapping"
      :error="error"
      :warning="warning"
      @close="handlePreviewModalClose"
    />
  </teleport>
</template>

<script lang="ts">
import { SubgraphPoolBase } from '@balancer-labs/sdk';
import { getAddress, isAddress } from '@ethersproject/address';
import { formatUnits } from '@ethersproject/units';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useSwapAssets } from '@/composables/swap/useSwapAssets';
import SwapPreviewModal from '@/components/modals/SwapPreviewModal.vue';
import { SwapSettingsContext } from '@/components/popovers/SwapSettingsPopover.vue';
import { useSwapState } from '@/composables/swap/useSwapState';
import useSwapping from '@/composables/swap/useSwapping';
import useValidation from '@/composables/swap/useValidation';
import useBreakpoints from '@/composables/useBreakpoints';
import useNumbers, { FNumFormats } from '@/composables/useNumbers';
import { useTokens } from '@/providers/tokens.provider';
import { TOKENS } from '@/constants/tokens';
import { lsGet } from '@/lib/utils';
import { WrapType } from '@/lib/utils/balancer/wrapper';
import { isRequired } from '@/lib/utils/validations';
import { ApiErrorCodes } from '@/services/cowswap/errors/OperatorError';
import useWeb3 from '@/services/web3/useWeb3';
import SwapPair from './SwapPair.vue';
// import SwapRoute from './SwapRoute.vue';

export default defineComponent({
  components: {
    SwapPair,
    SwapPreviewModal,
    // SwapRoute,
  },
  setup() {
    // COMPOSABLES
    const { inputAsset, outputAsset } = useSwapAssets();
    const router = useRouter();
    const { t } = useI18n();
    const { bp } = useBreakpoints();
    const { fNum } = useNumbers();
    const { appNetworkConfig, isMismatchedNetwork } = useWeb3();

    const { nativeAsset } = useTokens();
    const {
      tokenInAddress,
      tokenOutAddress,
      tokenInAmount,
      tokenOutAmount,
      setTokenInAddress,
      setTokenOutAddress,
      setTokenInAmount,
      setTokenOutAmount,
      setInitialized,
    } = useSwapState();
    // DATA
    const exactIn = ref(true);
    const modalSwapPreviewIsOpen = ref(false);
    const dismissedErrors = ref({
      highPriceImpact: false,
    });
    const alwaysShowRoutes = lsGet('alwaysShowRoutes', false);
    const swapCardShadow = computed(() => {
      switch (bp.value) {
        case 'xs':
          return 'none';
        case 'sm':
          return 'lg';
        default:
          return 'xl';
      }
    });
    const swapping = useSwapping(
      exactIn,
      tokenInAddress,
      tokenInAmount,
      tokenOutAddress,
      tokenOutAmount
    );
    const { errorMessage } = useValidation(
      tokenInAddress,
      tokenInAmount,
      tokenOutAddress,
      tokenOutAmount
    );
    // COMPUTED
    const isHighPriceImpact = computed(
      () =>
        swapping.sor.validationErrors.value.highPriceImpact &&
        !dismissedErrors.value.highPriceImpact
    );
    const swapDisabled = computed(() => {
      const hasMismatchedNetwork = isMismatchedNetwork.value;
      const hasAmountsError = !tokenInAmount.value || !tokenOutAmount.value;
      const hasCowswapErrors =
        swapping.isCowswapSwap.value &&
        swapping.cowswap.hasValidationError.value;
      const hasBalancerErrors =
        swapping.isBalancerSwap.value && isHighPriceImpact.value;

      console.log(
        hasMismatchedNetwork,
        'hasMismatchedNetwork',
        hasAmountsError,
        'hasAmountsError',
        hasCowswapErrors,
        'hasCowswapErrors',
        hasBalancerErrors,
        'hasBalancerErrors'
      );
      console.log(
        swapping.isBalancerSwap.value,
        isHighPriceImpact.value,
        'hasBalancerErrors'
      );

      return (
        hasAmountsError ||
        hasCowswapErrors ||
        hasBalancerErrors ||
        hasMismatchedNetwork
      );
    });
    const title = computed(() => {
      if (swapping.wrapType.value === WrapType.Wrap) {
        return `${t('wrap')} ${swapping.tokenIn.value.symbol}`;
      }
      if (swapping.wrapType.value === WrapType.Unwrap) {
        return `${t('unwrap')} ${swapping.tokenOut.value.symbol}`;
      }
      return t('swap');
    });
    const pools = computed<SubgraphPoolBase[]>(
      // @ts-ignore-next-line -- Fix types incompatibility error. Related to BigNumber?
      () => {
        return swapping.sor.pools.value;
      }
    );
    const error = computed(() => {
      if (isMismatchedNetwork.value) {
        return {
          header: t('switchNetwork'),
          body: t('networkMismatch', [appNetworkConfig.name]),
        };
      }
      if (swapping.isBalancerSwap.value && !swapping.isLoading.value) {
        if (swapping.sor.validationErrors.value.noSwaps) {
          return {
            header: t('insufficientLiquidity'),
            body: t('insufficientLiquidityDetailed'),
          };
        }
      }
      if (swapping.isCowswapSwap.value) {
        if (swapping.cowswap.validationError.value != null) {
          const validationError = swapping.cowswap.validationError.value;
          if (validationError === ApiErrorCodes.SellAmountDoesNotCoverFee) {
            return {
              header: t('cowswapErrors.lowAmount.header'),
              body: t('cowswapErrors.lowAmount.body'),
            };
          } else if (validationError === ApiErrorCodes.PriceExceedsBalance) {
            return {
              header: t('cowswapErrors.lowBalance.header', [
                swapping.tokenIn.value.symbol,
              ]),
              body: t('cowswapErrors.lowBalance.body', [
                swapping.tokenIn.value.symbol,
                fNum(
                  formatUnits(
                    swapping.getQuote().maximumInAmount,
                    swapping.tokenIn.value.decimals
                  ),
                  FNumFormats.token
                ),
                fNum(swapping.slippageBufferRate.value, FNumFormats.percent),
              ]),
            };
          } else if (validationError === ApiErrorCodes.NoLiquidity) {
            return {
              header: t('cowswapErrors.noLiquidity.header', [
                swapping.tokenIn.value.symbol,
              ]),
              body: t('cowswapErrors.noLiquidity.body'),
            };
          } else {
            return {
              header: t('cowswapErrors.genericError.header'),
              body: swapping.cowswap.validationError.value,
            };
          }
        }
      } else if (swapping.isBalancerSwap.value) {
        if (isHighPriceImpact.value) {
          return {
            header: t('highPriceImpact'),
            body: t('highPriceImpactDetailed'),
            label: t('accept'),
          };
        }
      }
      return undefined;
    });
    const warning = computed(() => {
      if (swapping.isCowswapSwap.value) {
        if (swapping.cowswap.warnings.value.highFees) {
          return {
            header: t('cowswapWarnings.highFees.header'),
            body: t('cowswapWarnings.highFees.body'),
          };
        }
      }
      return undefined;
    });

    // METHODS

    function handleErrorButtonClick() {
      if (swapping.sor.validationErrors.value.highPriceImpact) {
        dismissedErrors.value.highPriceImpact = true;
      }
    }

    function isNativeAssetIdentifier(assetParam: string | undefined): boolean {
      return (
        assetParam?.toLowerCase() === nativeAsset.deeplinkId?.toLowerCase() ||
        assetParam?.toLowerCase() === nativeAsset.symbol?.toLowerCase()
      );
    }

    function getFirstValidAddress(assets: string[]): string | undefined {
      for (const asset of assets) {
        if (isNativeAssetIdentifier(asset)) {
          return nativeAsset.address;
        }
        if (isAddress(asset)) {
          return getAddress(asset);
        }
      }
    }

    function populateInitialTokens(): void {
      const assetIn = getFirstValidAddress([
        router.currentRoute.value.params.assetIn,
        inputAsset.value,
        appNetworkConfig.tokens.InitialSwapTokens.input,
      ]);
      if (assetIn) {
        setTokenInAddress(assetIn);
      }
      const assetOut = getFirstValidAddress([
        router.currentRoute.value.params.assetOut,
        outputAsset.value,
        appNetworkConfig.tokens.InitialSwapTokens.output,
      ]);
      if (assetOut) {
        setTokenOutAddress(assetOut);
      }

      let assetInAmount = router.currentRoute.value.query?.inAmount as string;
      let assetOutAmount = router.currentRoute.value.query?.outAmount as string;
      if (assetInAmount) {
        setTokenInAmount(assetInAmount);
      }
      if (!assetInAmount && assetOutAmount) {
        setTokenOutAmount(assetOutAmount);
      }
    }
    function switchToWETH() {
      tokenInAddress.value = appNetworkConfig.addresses.weth;
    }
    function handlePreviewButton() {
      swapping.resetSubmissionError();
      modalSwapPreviewIsOpen.value = true;
    }
    function handlePreviewModalClose() {
      swapping.resetSubmissionError();
      modalSwapPreviewIsOpen.value = false;
    }
    // INIT
    onBeforeMount(() => {
      populateInitialTokens();
      setInitialized(true);
    });
    return {
      // constants
      TOKENS,
      // context
      SwapSettingsContext,
      // data
      tokenInAddress,
      tokenInAmount,
      tokenOutAddress,
      tokenOutAmount,
      modalSwapPreviewIsOpen,
      alwaysShowRoutes,
      exactIn,
      swapping,
      // computed
      pools,
      title,
      error,
      warning,
      errorMessage,
      isRequired,
      swapDisabled,
      swapCardShadow,
      handlePreviewButton,
      handlePreviewModalClose,
      // methods
      switchToWETH,
      handleErrorButtonClick,
      appNetworkConfig,
    };
  },
});
</script>
<style scoped>
/* This is needed because the swap settings popover overflows */
.card-container {
  /* overflow: unset; */

  /* min-width: 302px; */

  /* max-width: 300px; */

  /* margin: 20px auto; */

  /* height: 360px; */

  /* padding: 17.6px 17.6px 24px 24px; */
  border-radius: 18px;
  height: 440px;
  max-width: 360px;
  box-shadow: 0 0 29px 0 rgb(0 0 0 / 33%);
  background-image: linear-gradient(
    to right,
    rgb(211 157 235 / 60%),
    rgb(241 165 188 / 60%)
  );
  background-color: transparent;

  /* min-height: 366px */

  /* min-width: 302px; */
}

.swap-gasless :deep(.bal-toggle) {
  width: 3rem;
}

.gas-symbol {
  @apply h-8 w-8 rounded-full flex items-center justify-center text-lg bg-gray-50 dark:bg-gray-800;
}

.gas-symbol::before {
  content: '⛽';
}

.signature-symbol::before {
  content: '✍️';
}

.swap-button {
  color: #fff;

  /* border: 1px solid #133838; */
  background-color: red;
  border-radius: 50px;

  /* margin-top: 25px; */
}

.divider {
  background-color: red;
  margin-top: 12px;
  margin-bottom: 8px;
  height: 1px;
  border: 0;
}

.tabs {
  position: relative;
  top: 2px;

  /* margin-bottom: 1px; */
}

.tabs nav {
  margin: 0 22px;
  text-align: center;
}

.tabs nav ul {
  position: relative;
  display: flexbox;
  display: flex;
  display: -moz-flex;
  display: -ms-flex;
  display: flex;
  margin: 0 auto;
  padding: 0;
  max-width: 1200px;
  list-style: none;
  -ms-box-orient: horizontal;
  -ms-box-pack: center;
  flex-flow: row wrap;
  flex-flow: row wrap;
  justify-content: center;
  justify-content: center;
}

.tabs nav ul li {
  position: relative;
  z-index: 1;
  display: block;
  margin: 0;
  text-align: center;
  flex: 1;
  flex: 1;
  backface-visibility: hidden;
}

.tabs nav ul li.last {
  flex: 1.7;
}

.tabs nav a {
  position: relative;
  display: block;
  font-size: 18px;
  font-weight: 900;
  color: #133838;
  padding: 15px 0 6px;
  outline: none;
  line-height: 1;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: none;
  text-overflow: ellipsis;
}

.tabs nav ul li a::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #e2deb5;
  border-radius: 7px 7px 0 0;
  transform: perspective(2px) rotateX(2.2deg) translateZ(-1px);
  transition: background 500ms ease-in-out, color 500ms ease,
    border-color 500ms ease;
}

.tabs nav ul li.tab-current a {
  padding: 15px 0 6px;
}

.tabs nav ul li.tab-current a::after {
  background-color: rgb(211 157 235 / 40%);

  /* background-color: rgb(255, 255, 255,0.5); */
}

.tabs nav ul li:hover a::after {
  transition: background 100ms !important;

  /* background: white; */
}

.tabs nav ul li.tab-current a span {
  display: inline-block;
  height: 18px;
  line-height: 1;
  transition: none;
}
</style>
