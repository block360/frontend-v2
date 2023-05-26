<script setup lang="ts">
import { useI18n } from 'vue-i18n';

// COMPOSABLES
const { t } = useI18n();
</script>
  <template>
  <div class="inner-box">
    <div class="default-box">
      <div class="about">
        <p>{{ t('Towards') }}</p>
        <h6 class="my-2 text-center imp">{{ t('About') }}</h6>
        <p>
          {{ t('About1') }} <span>{{ t('About2') }}</span> {{ t('About3') }}
          <a href="https://gsu.io/" target="_blank">{{ t('About4') }}</a>
        </p>
        <p class="mt-1 mb-4">{{ t('About5') }}</p>
        <p class="mb-2">{{ t('About6') }}</p>
        <ul>
          <li>{{ t('About8') }}</li>
          <li>{{ t('About9') }}</li>
          <li>{{ t('About10') }}</li>
        </ul>
        <a href="#" data-toggle="modal" data-target="#disclaimer">
          {{ t('Disclaimer') }}
        </a>
      </div>
      <div class="footer">
        <hr class="divider" />
        <ul>
          <li>
            <a href="#" data-toggle="modal" data-target="#simpleDeposit">
              {{ t('AddGSUToYourWallet') }}
            </a>
            <span>|</span>
          </li>
          <li>
            <a href="https://gsu.io/" target="_blank"
              >{{ t('AboutTheGSU') }}
            </a>
            <span>|</span>
          </li>
          <li>
            <a href="#" data-toggle="modal" data-target="#faqs">
              {{ t('FAQ') }}
            </a>
            <span>|</span>
          </li>
          <li>
            <a href="#" data-toggle="modal" data-target="#support">
              {{ t('Support') }}
            </a>
            <span>|</span>
          </li>
          <li>
            <a href="#">
              {{ t('Code') }}
            </a>
            <span>|</span>
          </li>
          <li>
            <a href="#">{{ t('Discords') }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about p.imp {
  font-size: 11px;
}

.about p {
  font-size: 14px;
  text-align: justify;
}

.about span {
  font-size: 17px;
  font-weight: 600;
}

.about a {
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
}

.about ul {
  padding-left: 0;
  margin-bottom: 0;
}

.about ul li {
  font-size: 14px;
  margin-bottom: 5px;
  list-style: none;
}

.default-box {
  /* min-height: 366px;
  min-width: 302px; */

  /* margin-top: 37px; */
  border-radius: 20px;

  /* padding: 3rem 1rem; */
  padding: 8px 16px;
  background-color: rgb(255 255 255 / 0%);
  box-shadow: 0 0 29px 0 rgb(0 0 0 / 33%);
  height: 440px;
}

.footer {
  /* position: absolute; */

  /* top: auto; */

  /* bottom: 10px; */

  /* left: 0; */
}

.footer ul {
  margin: 0 3px;
  padding: 0;
  text-align: center;
}

.footer ul li {
  display: inline;
  list-style-type: none;
  line-height: 0;
}

.footer ul li a {
  font-size: 13px;
  cursor: pointer;
  line-height: 0;
  color: #133838;
}

.footer ul li span {
  margin: 0 5px;
  font-weight: 800;
  line-height: 0;
}

.inner-box {
  min-width: 302px;
  max-width: 360px;

  /* margin: 20px auto; */
  margin-right: 20px;
  margin-top: 37px;
  background-color: rgb(255 255 255 / 50%);
  border-radius: 20px;

  /* height: 500px; */
}

.modal .form-control {
  font-size: 15px;
  padding: 5px 10px;
  height: 32px;
  box-shadow: none;
}

.modal textarea.form-control {
  height: auto;
}

.modal-content {
  padding: 2rem 1rem;
  border-radius: 18px;
  background: rgb(255 255 255);
}

.imp {
  color: #e94173;
  font-weight: 700;
  font-size: 18px;
}

.divider {
  background-color: red;
  margin-top: 8px;
  margin-bottom: 8px;
  height: 1px;
  border: 0;
}
</style>


