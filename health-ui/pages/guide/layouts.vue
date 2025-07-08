<template>
  <div class="header-type-guide">
    <h2>BaseHeader 컴포넌트 타입별 가이드</h2>
    <!-- 1. 기본텍스트 -->
    <div class="header-demo">
      <h3>1. 기본 헤더 - 뒤로가기 + 텍스트 타이틀</h3>
      <BaseHeader title="텍스트 타이틀" logo-type="text" :has-notification="false" :has-reward="false" />
      <div class="code-example">
        <code>
          &lt;BaseHeader<br />
          &nbsp;&nbsp;title="텍스트 타이틀"<br />
          &nbsp;&nbsp;:show-back-button="true"<br />
          &nbsp;&nbsp;logo-type="text"<br />
          /&gt;
        </code>
      </div>
    </div>

    <!-- 2. 이미지 로고 -->
    <div class="header-demo">
      <h3>2. 건강의신 로고 + 알람 + 리워드</h3>
      <BaseHeader
        title="건강의신"
        :show-back-button="false"
        logo-type="image"
        :has-notification="true"
        :has-reward="true"
      />
      <div class="code-example">
        <code>
          &lt;BaseHeader<br />
          &nbsp;&nbsp;title="건강의신"<br />
          &nbsp;&nbsp;:show-back-button="false"<br />
          &nbsp;&nbsp;logo-type="image"<br />
          &nbsp;&nbsp;:has-notification="true"<br />
          /&gt;
        </code>
      </div>
    </div>

    <!-- 3. 뒤로가기 + 알림 아이콘 -->
    <div class="header-demo">
      <h3>3. 뒤로가기 + 알림 + 리워드</h3>
      <BaseHeader title="텍스트 타이틀" logo-type="text" :has-notification="true" :has-reward="true" />
      <div class="code-example">
        <code>
          &lt;BaseHeader<br />
          &nbsp;&nbsp;title="텍스트 타이틀"<br />
          &nbsp;&nbsp;:show-back-button="true"<br />
          &nbsp;&nbsp;:has-notification="true"<br />
          &nbsp;&nbsp;:has-reward="true"<br />
          /&gt;
        </code>
      </div>
    </div>

    <!-- 4. 가운데 정렬 제목 -->
    <div class="header-demo">
      <h3>4. 가운데 정렬 제목</h3>
      <BaseHeader
        title="중앙 정렬"
        logo-type="text"
        :is-center-title="true"
        :has-notification="false"
        :has-reward="false"
      />
      <div class="code-example">
        <code>
          &lt;BaseHeader<br />
          &nbsp;&nbsp;title="중앙 정렬"<br />
          &nbsp;&nbsp;:show-back-button="true"<br />
          &nbsp;&nbsp;:is-center-title="true"<br />
          /&gt;
        </code>
      </div>
    </div>

    <!-- 5. 텍스트 타이틀 + 텍스트 -->
    <div class="header-demo">
      <h3>5. 텍스트 타이틀 + 텍스트</h3>
      <BaseHeader
        title="텍스트 타이틀"
        :show-back-button="true"
        logo-type="text"
        :has-add-text="true"
        add-text='<a href="#"><span>미확인 복권</span><strong>2</strong></a>'
        :has-notification="false"
        :has-reward="false"
      />
      <div class="code-example">
        <code>
          &lt;BaseHeader<br />
          &nbsp;&nbsp;title="HTML 텍스트 데모"<br />
          &nbsp;&nbsp;:show-back-button="true"<br />
          &nbsp;&nbsp;:has-add-text="true"<br />
          &nbsp;&nbsp;add-text='&lt;a href="#"&gt;&lt;span&gt;미확인
          복권&lt;/span&gt;&lt;strong&gt;2&lt;/strong&gt;&lt;/a&gt;' /&gt;
        </code>
      </div>
    </div>

    <div class="props-guide">
      <h2>BaseHeader Props</h2>
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td>String</td>
            <td>"Title"</td>
            <td>헤더 제목</td>
          </tr>
          <tr>
            <td>showBackButton</td>
            <td>Boolean</td>
            <td>true</td>
            <td>뒤로가기 버튼 표시 여부</td>
          </tr>
          <tr>
            <td>logoType</td>
            <td>"both" | "text" | "image"</td>
            <td>"text"</td>
            <td>로고 타입</td>
          </tr>

          <tr>
            <td>hasNotification</td>
            <td>Boolean</td>
            <td>false</td>
            <td>알림 아이콘 표시 여부</td>
          </tr>
          <tr>
            <td>hasReward</td>
            <td>Boolean</td>
            <td>false</td>
            <td>리워드 아이콘 표시 여부</td>
          </tr>
          <tr>
            <td>hasAddText</td>
            <td>Boolean</td>
            <td>false</td>
            <td>커스텀 텍스트 표시 여부</td>
          </tr>
          <tr>
            <td>addText</td>
            <td>String</td>
            <td>""</td>
            <td>커스텀 텍스트 내용 (HTML 태그)</td>
          </tr>
          <tr>
            <td>isCenterTitle</td>
            <td>Boolean</td>
            <td>false</td>
            <td>제목 가운데 정렬 여부</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped lang="scss">
.header-type-guide {
  padding: 2rem 0;
  margin: 0 auto;

  h2 {
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
  }
}

.header-demo {
  margin-bottom: 3rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;

  h3 {
    background: #f5f5f5;
    margin: 0;
    padding: 1rem;
    color: #666;
    font-size: 1.5rem;
    font-weight: 600;
  }

  // 데모용 BaseHeader 스타일링
  :deep(.c-header) {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    width: 100% !important;
    z-index: auto !important;
    margin-bottom: 0 !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
  }

  .code-example {
    padding: 1rem;
    background: #f8f9fa;
    border-top: 1px solid #e0e0e0;

    code {
      font-size: 1.4rem;
      color: #d63384;
      background: none;
      display: block;
      line-height: 1.6;
    }
  }
}

.props-guide {
  margin-top: 4rem;

  h2 {
    color: #333;
    margin-bottom: 1.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 0.8rem;
    overflow: hidden;
    box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.1);

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 0.1rem solid #e0e0e0;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #495057;
    }

    td:first-child {
      font-family: 'Courier New', monospace;
      color: #d63384;
      font-weight: 500;
    }

    td:nth-child(2) {
      font-family: 'Courier New', monospace;
      color: #198754;
      font-size: 1.4rem;
    }

    td:nth-child(3) {
      font-family: 'Courier New', monospace;
      color: #0d6efd;
      font-size: 1.4rem;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover {
      background-color: #f8f9fa;
    }
  }
}
</style>
