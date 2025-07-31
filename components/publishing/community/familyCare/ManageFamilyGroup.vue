<template>
  <div class="family-group">
    <div class="add-group-tit">
      <button type="button" class="btn-add-group" title="그룹 추가">그룹추가 하기</button>
    </div>

    <div class="group-list">
      <div class="group-item">
        <button type="button" class="btn-move-list" title="순서 변경"></button>
        <strong class="tit">우리집</strong>
        <div class="modify-btns">
          <button type="button" class="btn-modify">이름바꾸기</button>
          <button type="button" class="btn-modify">삭제</button>
        </div>
      </div>
      <div class="group-item">
        <button type="button" class="btn-move-list" title="순서 변경"></button>
        <strong class="tit">우리집</strong>
        <div class="modify-btns">
          <button type="button" class="btn-modify">이름바꾸기</button>
          <button type="button" class="btn-modify">삭제</button>
        </div>
      </div>
      <div class="group-item">
        <button type="button" class="btn-move-list" title="순서 변경"></button>
        <strong class="tit">우리집</strong>
        <div class="modify-btns">
          <button type="button" class="btn-modify">이름바꾸기</button>
          <button type="button" class="btn-modify">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.family-group {
  position: relative;
  .add-group-tit {
    margin-top: 0.8rem;
    padding: 2.2rem 0;
    .btn-add-group {
      display: flex;
      gap: 0 1.2rem;

      &::before {
        content: '';
        display: block;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 50%;
        background-color: #4f5561;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M9.00039 5.3999L9.00039 12.5999M12.6004 8.9999L5.40039 8.9999' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      }
      font-size: 1.6rem;
      font-weight: 700;
      color: #2b2b2b;
    }
  }

  .group-list {
    margin: 0 -2rem;
    .group-item {
      display: flex;
      padding: 2.3rem 2rem;
      gap: 0 1.6rem;
      align-items: center;
      background: rgba(255, 255, 255, 0.5);
      .btn-move-list {
        width: 2.4rem;
        height: 2.4rem;
        flex: 0 0 auto;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M20 18H4M20 12H4M20 6H4' stroke='%23D5D5D5' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
      }
      .modify-btns {
        margin-left: auto;
        display: flex;
        gap: 0 2.4rem;
        .btn-modify {
          font-size: 1.4rem;
          font-weight: 500;
          color: #555;
          position: relative;
          & + .btn-modify {
            &::before {
              content: '';
              display: block;
              width: 0.1rem;
              height: 1.6rem;
              top: 50%;
              margin-top: -0.8rem;
              position: absolute;
              left: -1.2rem;
              background: #e2e2e2;
            }
          }
        }
      }
    }
  }
}
</style>
