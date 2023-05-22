<!-- <template>
<div class="inner-box d-flex justify-content-center align-content-stretch">
    <div class="default-box position-relative pt-2">
        <div class="about">
            <p class="imp">{{t("Towards")}}</p>
            <h6 class="text-center text-red font-weight-bold my-2">{{t("About")}}</h6>
            <p>{{t("About1")}} <span>{{t("About2")}}</span> {{t("About3")}} <a href="https://gsu.io/" target="_blank">{{t("About4")}}</a></p>
            <p class="mt-1 mb-4">{{t("About5")}}</p>
            <p class="mb-2">{{t("About6")}}</p>
            <ul>
                <li>{{t("About8")}}</li>
                <li>{{t("About9")}}</li>
                <li>{{t("About10")}}</li>
            </ul>
            <a href="#" data-toggle="modal" data-target="#disclaimer">
                {{t("Disclaimer")}}
            </a>
        </div>
        <div class="footer">
            <hr class="red mx-3 mb-2" />
            <ul>
                <li>
                    <a href="#" data-toggle="modal" data-target="#simpleDeposit">
                        {{t("AddGSUToYourWallet")}}
                    </a>
                    <span>|</span>
                </li>
                <li>
                    <a href="https://gsu.io/" target="_blank">{{t("AboutTheGSU")}}
                    </a>
                    <span>|</span>
                </li>
                <li>
                    <a href="#" data-toggle="modal" data-target="#faqs">
                        {{t("FAQ")}}
                    </a>
                    <span>|</span>
                </li>
                <li>
                    <a href="#" data-toggle="modal" data-target="#support">
                        {{t("Support")}}
                    </a>
                    <span>|</span>
                </li>
                <li>
                    <a href="#">
                        {{t("Code")}}
                    </a>
                    <span>|</span>
                </li>
                <li>
                    <a href="#">{{t("Discords")}}</a>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { useI18n } from "vue-i18n";

var packageJson = require("../../package.json");

// COMPOSABLES
const { t } = useI18n();
export default {
    name: "About",
    data() {
        return {
            version: packageJson.version
        };
    },
    mounted() {
        console.log('%c DEX APP VERSION:' + this.version, 'font-size: 12px;font-weight:600; background: #feed02; color: #133838');
    }
};
</script> -->
