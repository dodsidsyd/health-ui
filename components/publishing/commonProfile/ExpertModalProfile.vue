<template>
  <div class="modal-profile">
    <span class="profile-photo">
      <img src="../../../assets/images/img-community-01.png" alt="" />
    </span>
    <div class="profile-info">
      <strong class="name">양정환 설계사</strong>
      <div class="detail-info">
        <span class="company">삼성생명</span>
        <span class="service_year">7년차</span>
        <button type="button" class="btn flowing-btn ml-16">팔로잉</button>
      </div>
    </div>
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
      align-items: center;
      .company {
        font-size: 1.6rem;
        font-weight: 500;
        color: #555;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        &::after {
          content: '';
          width: 0.3rem;
          height: 0.3rem;
          margin: 0 0.6rem;
          border-radius: 50%;
          background: #959595;
        }
      }
      .service_years {
        font-size: 1.6rem;
        color: #2b2b2b;
        font-weight: 500;
        display: flex;
        align-items: center;
      }
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
  }
}
</style>
