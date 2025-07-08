<template>
  <div class="modal-profile">
    <span class="profile-photo">
      <img src="../../../assets/images/img-community-01.png" alt="" />
    </span>
    <div class="profile-info">
      <strong class="name">장동건</strong>
      <div class="detail-info">
        <span class="location">서울강남</span>
        <span class="reward">12</span>
        <span class="message">메시지</span>
      </div>
    </div>
    <div class="flow-info">
      <div class="flow-item">
        <span class="tit">팔로워</span>
        <strong>10</strong>
      </div>
      <div class="flow-item">
        <span class="tit">팔로잉</span>
        <strong>152</strong>
      </div>
      <div class="flow-item">
        <span class="tit">팔로우</span>
        <button type="button" class="btn flowing-btn">팔로잉</button>
      </div>
    </div>
    <hr class="hr-section ml-n20 mr-n20 mb-10" />
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.modal-profile {
  .profile-photo {
    display: block;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    overflow: hidden;
    margin: -2rem auto 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .profile-info {
    display: flex;
    gap: 0 1.2rem;
    flex-direction: column;
    .name {
      font-size: 2rem;
      font-weight: 700;
      color: #2b2b2b;
      display: block;
      margin: 1.2rem 0;
    }
    .detail-info {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 0 0.6rem;
      .location,
      .reward,
      .message {
        font-size: 1.4rem;
        font-weight: 500;
        color: #2b2b2b;
        padding: 0.4rem 0.8rem;
        background: #f4f4f4;
        border-radius: 0.4rem;
      }
      .message {
        background: vars.$blue-primary;
        color: vars.$white;
      }
      .location,
      .reward,
      .message {
        display: inline-flex;
        align-content: center;
        gap: 0 0.2rem;
        &::before {
          content: '';
          display: inline-block;
          width: 1.8rem;
          height: 1.8rem;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }
      }
      .location {
        &::before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='16' viewBox='0 0 12 16' fill='none'%3E%3Cpath d='M5.99978 0.927734C3.16405 0.927734 0.856934 3.13996 0.856934 5.85916C0.856934 9.86238 5.54275 14.7564 5.74221 14.9627C5.80864 15.0315 5.9018 15.0705 5.99943 15.0706C6.09694 15.0706 6.19045 15.0317 6.25688 14.9632C6.45635 14.7577 11.1426 9.88122 11.1426 5.85916C11.1426 3.13996 8.83551 0.927734 5.99978 0.927734ZM5.99978 3.03792C7.61346 3.03792 8.92628 4.29674 8.92628 5.84405C8.92628 7.39137 7.61346 8.65016 5.99978 8.65016C4.38609 8.65016 3.07327 7.39134 3.07327 5.84403C3.07327 4.29671 4.38609 3.03792 5.99978 3.03792Z' fill='%234C7FF7'/%3E%3C/svg%3E");
        }
      }
      .reward {
        &::before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cg clip-path='url(%23clip0_7370_24223)'%3E%3Cpath d='M7.99651 0.996003C8.58268 0.52477 9.41774 0.52477 10.0039 0.996003L11.373 2.09665C11.6114 2.28826 11.8996 2.40765 12.2036 2.44069L13.95 2.63051C14.6977 2.71179 15.2881 3.30227 15.3694 4.04996L15.5592 5.79633C15.5923 6.10036 15.7117 6.38858 15.9033 6.62693L17.0039 7.99602C17.4752 8.58219 17.4752 9.41725 17.0039 10.0034L15.9033 11.3725C15.7117 11.6109 15.5923 11.8991 15.5592 12.2031L15.3694 13.9495C15.2881 14.6972 14.6977 15.2877 13.95 15.3689L12.2036 15.5588C11.8996 15.5918 11.6114 15.7112 11.373 15.9028L10.0039 17.0034C9.41774 17.4747 8.58268 17.4747 7.99651 17.0034L6.62742 15.9028C6.38907 15.7112 6.10085 15.5918 5.79682 15.5588L4.05045 15.3689C3.30275 15.2877 2.71227 14.6972 2.631 13.9495L2.44118 12.2031C2.40813 11.8991 2.28875 11.6109 2.09714 11.3725L0.996491 10.0034C0.525258 9.41725 0.525258 8.58219 0.996492 7.99602L2.09714 6.62693C2.28875 6.38858 2.40813 6.10036 2.44118 5.79633L2.631 4.04996C2.71227 3.30227 3.30275 2.71179 4.05045 2.63051L5.79682 2.44069C6.10085 2.40765 6.38907 2.28826 6.62742 2.09665L7.99651 0.996003Z' fill='%23C4D6FF'/%3E%3Ccircle cx='9.11457' cy='8.99933' r='5.60675' fill='%234C7FF7'/%3E%3Cpath d='M11.5724 8.63841L10.143 7.85665L9.36124 6.42722C9.28961 6.29463 9.15094 6.21387 9.00007 6.21387C8.8492 6.21387 8.71205 6.29616 8.6389 6.42722L7.85713 7.85665L6.4277 8.63841C6.29512 8.71004 6.21436 8.84871 6.21436 8.99958C6.21436 9.15045 6.29665 9.2876 6.4277 9.36075L7.85713 10.1425L8.6389 11.5719C8.71053 11.7045 8.8492 11.7853 9.00007 11.7853C9.15094 11.7853 9.28809 11.703 9.36124 11.5719L10.143 10.1425L11.5724 9.36075C11.705 9.28912 11.7858 9.15045 11.7858 8.99958C11.7858 8.84871 11.705 8.71004 11.5724 8.63841Z' fill='%23C4D6FF'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_7370_24223'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
        }
      }
      .message {
        &::before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M13.7887 3.05203C14.5076 2.80267 15.197 3.49231 14.9479 4.21121L10.8971 15.888C10.6194 16.6875 9.49666 16.7093 9.18809 15.9212L7.40098 11.3567L11.0475 7.71023C11.267 7.49058 11.267 7.13496 11.0475 6.91531C10.8278 6.69567 10.4722 6.69572 10.2525 6.91531L6.58945 10.5764L2.07969 8.81277C1.29124 8.50425 1.31301 7.38032 2.11289 7.10281L13.7887 3.05203Z' fill='white'/%3E%3C/svg%3E");
        }
      }
    }
  }
  .flow-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 2.4rem 0;
    .flow-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      position: relative;
      gap: 0.4rem;
      font-size: 1.8rem;
      font-weight: 700;
      color: #2b2b2b;
      align-items: center;
      .tit {
        font-size: 1.2rem;
        font-weight: 600;
        color: #959595;
      }
      .flowing-btn {
        background-color: #4f5561;
        color: vars.$white;
        font-size: 1.2rem;
        display: inline-flex;
        width: 7.5rem;
        line-height: 2.8rem;
        border-radius: 2rem;
        text-align: center;
        justify-content: center;
        align-items: center;
        &::before {
          content: '';
          width: 1.6rem;
          height: 1.6rem;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M1.1001 14.3996C1.10007 14.6757 1.3239 14.8996 1.60004 14.8996C1.87618 14.8996 2.10007 14.6758 2.1001 14.3997L1.1001 14.3996ZM1.60037 11.9993L2.10037 11.9994L1.60037 11.9993ZM8.4001 10.0996C8.67624 10.0996 8.9001 9.87575 8.9001 9.59961C8.9001 9.32347 8.67624 9.09961 8.4001 9.09961V10.0996ZM14.4001 10.8996C14.6762 10.8996 14.9001 10.6758 14.9001 10.3996C14.9001 10.1235 14.6762 9.89961 14.4001 9.89961V10.8996ZM10.8001 9.89961C10.524 9.89961 10.3001 10.1235 10.3001 10.3996C10.3001 10.6758 10.524 10.8996 10.8001 10.8996V9.89961ZM12.1001 12.1995C12.1001 12.4757 12.324 12.6995 12.6001 12.6995C12.8762 12.6995 13.1001 12.4757 13.1001 12.1995H12.1001ZM13.1001 8.59952C13.1001 8.32337 12.8762 8.09952 12.6001 8.09952C12.324 8.09952 12.1001 8.32337 12.1001 8.59952H13.1001ZM9.6001 3.99961H9.1001C9.1001 5.04895 8.24944 5.89961 7.2001 5.89961V6.39961V6.89961C8.80172 6.89961 10.1001 5.60123 10.1001 3.99961H9.6001ZM7.2001 6.39961V5.89961C6.15076 5.89961 5.3001 5.04895 5.3001 3.99961H4.8001H4.3001C4.3001 5.60123 5.59847 6.89961 7.2001 6.89961V6.39961ZM4.8001 3.99961H5.3001C5.3001 2.95027 6.15076 2.09961 7.2001 2.09961V1.59961V1.09961C5.59847 1.09961 4.3001 2.39798 4.3001 3.99961H4.8001ZM7.2001 1.59961V2.09961C8.24944 2.09961 9.1001 2.95027 9.1001 3.99961H9.6001H10.1001C10.1001 2.39798 8.80172 1.09961 7.2001 1.09961V1.59961ZM1.6001 14.3996L2.1001 14.3997L2.10037 11.9994L1.60037 11.9993L1.10037 11.9993L1.1001 14.3996L1.6001 14.3996ZM4.00037 9.59961V9.09961C2.39887 9.09961 1.10055 10.3978 1.10037 11.9993L1.60037 11.9993L2.10037 11.9994C2.10049 10.9501 2.95111 10.0996 4.00037 10.0996V9.59961ZM4.00037 9.59961V10.0996H8.4001V9.59961V9.09961H4.00037V9.59961ZM14.4001 10.3996V9.89961H12.6001V10.3996V10.8996H14.4001V10.3996ZM12.6001 10.3996V9.89961H10.8001V10.3996V10.8996H12.6001V10.3996ZM12.6001 12.1995H13.1001V10.3996H12.6001H12.1001V12.1995H12.6001ZM12.6001 10.3996H13.1001V8.59952H12.6001H12.1001V10.3996H12.6001Z' fill='white'/%3E%3C/svg%3E");
        }
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.1rem;
        height: 4rem;
        background: #eee;
      }
      &:first-child {
        &::before {
          content: none;
        }
      }
    }
  }
}
</style>
