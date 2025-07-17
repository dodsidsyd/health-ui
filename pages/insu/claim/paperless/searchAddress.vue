<template>
  <BaseBody
    :show-back-button="true"
    page-title="주소 검색"
    logo-type="text"
    :has-close-btn="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="flex flex-col">
      <InputText inp-type="search" placeholder="예) 판교역로 166, 분당 주공, 백현동532" />
      <!-- ToDo: 검색창에 입력하면 .wrap-tip을 숨김 -->
      <div class="wrap-tip">
        <div class="wrap-tit">
          <h2 class="tit">Tip</h2>
          <span class="tit-sub">아래와 같은 조합을 검색을 하시면 더욱 정확한 결과가 검색됩니다.</span>
        </div>
        <ul class="wrap-example">
          <li class="item">
            <div class="item-tit">도로명 + 건물번호</div>
            <div class="item-tit-sub">예) 판교역로 166, 제주청단로 242</div>
          </li>
          <li class="item">
            <div class="item-tit">지역명(동/리) + 번지</div>
            <div class="item-tit-sub">예) 백현동 532, 제주 영평동 2181</div>
          </li>
          <li class="item">
            <div class="item-tit">지역명(동/리) + 건물명(아파트명)</div>
            <div class="item-tit-sub">예) 분당 주공, 연수동 주공3차</div>
          </li>
          <li class="item">
            <div class="item-tit">사서함명 + 번호</div>
            <div class="item-tit-sub">예) 분당우체국사서함 1~100</div>
          </li>

        </ul>
      </div>
      <ul class="wrap-keyword">
        <li class="item-keyword">부산광역시 기장군 <strong>판</strong>곡길</li>
        <li class="item-keyword">광주광역시 남구 <strong>판</strong>촌길</li>
        <li class="item-keyword">대전광역시 동구 <strong>판</strong>암동</li>
      </ul>
      <div class="wrap-result">
        <div class="wrap-info">
          <div class="info-tit">검색어에 아래와 같은 조합을 이용하시면 더욱 정확한 결과가 검색되어요.</div>
          <div class="info-tit-sub">도로명+건물번호’, ‘지역명+지번’, ‘지역명+건물명(아파트명)’, ‘사서함명+번호’</div>
        </div>
        <ul class="wrap-address">
          <li class="address-item">
            <div class="item-head">
              <div class="post-num">46031</div>
              <div class="more">
                <div class="more-item">영문보기</div>
                <div class="more-item">지도</div>
              </div>
            </div>
            <div class="address">
              <div class="address-detail">
                <div class="label">도로명</div>
                <div class="value">부산 기장군 장안읍 판고길 2</div>
              </div>
              <div class="address-detail">
                <div class="label">도로명</div>
                <div class="value">부산 기장군 장안읍 판고길 2</div>
              </div>
              <div class="wrap-address-more">
                <span class="text">ㄴ 외 지번주소 1건</span>
                <div class="btn-more">더보기</div>
              </div>
            </div>
          </li>
          <li class="address-item">
            <div class="item-head">
              <div class="post-num">46031</div>
              <div class="more">
                <div class="more-item">영문보기</div>
                <div class="more-item">지도</div>
              </div>
            </div>
            <div class="address">
              <div class="address-detail">
                <div class="label">도로명</div>
                <div class="value">부산 기장군 장안읍 판고길 2</div>
              </div>
              <div class="address-detail">
                <div class="label">도로명</div>
                <div class="value">부산 기장군 장안읍 판고길 2</div>
              </div>
              <div class="wrap-address-more">
                <span class="text">ㄴ 외 지번주소 1건</span>
                <div class="btn-more">더보기</div>
              </div>
            </div>
          </li>
          <li class="address-item">
            <div class="item-head">
              <div class="post-num">46031</div>
              <div class="more">
                <div class="more-item">영문보기</div>
                <div class="more-item">지도</div>
              </div>
            </div>
            <div class="address">
              <div class="address-detail">
                <div class="label">도로명</div>
                <div class="value">부산 기장군 장안읍 판고길 2</div>
              </div>
              <div class="address-detail">
                <div class="label">도로명</div>
                <div class="value">부산 기장군 장안읍 판고길 2</div>
              </div>
              <div class="wrap-address-more">
                <span class="text">ㄴ 외 지번주소 1건</span>
                <div class="btn-more">더보기</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'

</script>

<style scoped lang="scss">
.wrap-result {
  .wrap-address {
    border-top: 0.1rem solid #EEEEEE;
    margin: 0 -2rem;
    padding: 0 2rem;
    .address-item {
      padding: 2rem 0.4rem;
      &:not(:first-child) {
        border-top: 0.1rem solid #EEEEEE;
      }
      .item-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .post-num {
          font-size: 1.6rem;
          font-weight: normal;
          color: #F14960;
        }
        .more {
          display: flex;
          align-items: center;
          .more-item {
            padding: 0 0.8rem;
            height: 1.4rem;
            display: flex;
            align-items: center;
            font-size: 1.4rem;
            font-weight: 400;
            color: #555555;
            &:not(:first-child) {
              border-left: 0.1rem solid #D2D2D2;
            }
          }
        }
      }
      .address {
        margin-top: 1.6rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        .address-detail {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          .label {
            display: inline-block;
            padding: 0.3rem 0.6rem;
            border-radius: 0.4rem;
            border: 0.1rem solid #F4F4F4;
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 130%;
            color: #4C7FF7;
          }
          .value {
            font-size: 1.6rem;
            font-weight: 500;
          }
        }
        .wrap-address-more {
          margin-left: 5rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          .text {
            font-size: 1.2rem;
            line-height: 130%;
            color: #959595;
          }
          .btn-more {
            display: inline-block;
            padding: 0.2rem 0.4rem;
            font-size: 0.9rem;
            font-weight: 500;
            background-color: #959595;
            border-radius: 0.3rem;
            color: #fff;
          }
        }
      }
    }
  }
  .wrap-info {
    padding: 1.6rem 0;
    .info-tit {
      font-size: 1.2rem;
      line-height: 130%;
    }
    .info-tit-sub {
      margin-top: 0.4rem;
      font-size: 1.2rem;
      line-height: 130%;
      color: #4C7FF7;
    }
    
  }
}
.wrap-tip {
  margin-top: 2.4rem;
  .wrap-tit {
    .tit {
      font-size: 1.6rem;
      font-weight: 700;
    }
    .tit-sub {
      display: inline-block;
      margin-top: 0.8rem;
      font-size: 1.2rem;
      line-height: 130%;
    }
  }
  .wrap-example {
    margin-top: 2.4rem;
    .item {
      &:not(:first-child) {
        margin-top: 1.2rem;
      }
      .item-tit {
        font-size: 1.3rem;
        font-weight: 500;
        color: #555555;
      }
      .item-tit-sub {
        margin-top: 0.4rem;
        font-size: 1.2rem;
        line-height: 130%;
        color: #4C7FF7;
      }
    }
  }
}
.wrap-keyword {
  margin-top: 1rem;
  .item-keyword {
    padding: 1.5rem 0;
    font-size: 1.6rem;
    font-weight: 500;
    strong {
      color: #4C7FF7;
    }
  }
}
</style>
