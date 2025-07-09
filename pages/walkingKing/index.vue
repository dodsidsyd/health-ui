<template>
    <BaseBody
        page-title="걷기왕"
        logo-type="text"
        :has-notification="true"
        :has-reward="true"
    >
        <div style="background-color: #3b82f6; width: 100%">
            <div style="display: flex; justify-content: space-between">
                <div style="color: white">걷기왕</div>
                <div style="display: flex">
                    <div style="color: white">[달력아이콘]</div>
                    <div style="color: red">{{ notificationCount }}</div>
                </div>
            </div>
            <div style="display: flex">
                <div style="margin-right: 10px">[프로필사진이미지]</div>
                <div style="margin-right: 10px">
                    <div style="color: white">{{ profileName }}</div>
                    <div style="color: white">{{ userRegion }}</div>
                </div>
                <div style="margin-right: 10px">[메달이미지]</div>
                <div style="margin-right: 10px; color: white">
                    {{ userRank }}
                </div>
            </div>
            <div style="display: flex">
                <div style="display: flex">
                    <div style="margin-right: 10px">
                        <div style="display: flex">
                            <div>[포인트아이콘]</div>
                            <div style="color: white">[총상금]</div>
                        </div>
                        <div style="color: white">{{ totalPrizeMoney }}</div>
                    </div>
                    <div style="margin-right: 10px">
                        <div style="display: flex">
                            <div>[트로피아이콘]</div>
                            <div style="color: white">[올해 상금 랭킹]</div>
                        </div>
                        <div style="color: white">{{ yearlyPrizeRank }}</div>
                    </div>
                    <div style="margin-right: 10px">
                        <div style="display: flex">
                            <div>[깃발아이콘]</div>
                            <div style="color: white">[챌린지]</div>
                        </div>
                        <div style="color: white">{{ totalChallenges }}</div>
                    </div>
                </div>
            </div>
            <div>
                <div style="display: flex; background-color: white">
                    <div>[개인전배지]</div>
                    <div>[포인트배지]</div>
                    <div style="margin-right: 10px">[비용배지]</div>
                    <div style="color: yellow">{{ remainingDays }}</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="font-size: x-large">{{ challengeTitle }}</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="margin-right: 30px; color: #4a5568">
                        {{ challengePeriod }}
                    </div>
                    <div>[사람아이콘이미지]</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="margin-right: 95px; color: #4a5568">
                        [총상금]
                    </div>
                    <div style="color: #4a5568">[참가자]</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="margin-right: 30px">
                        {{ challengePrizeAmount }}
                    </div>
                    <div>{{ participantCount }}</div>
                </div>
                <div style="display: flex; color: red; background-color: white">
                    {{ prizeChangeAmount }}
                </div>
                <div style="display: flex; background-color: white">
                    <div style="color: #4a5568">[현재순위]</div>
                    <div style="font-weight: bold">{{ currentRank }}</div>
                    <div style="color: red">{{ rankChange }}</div>
                    <div style="color: #3b82f6">{{ stepCount }}</div>
                </div>
                <div>[swipe]</div>
                <div
                    style="
                        display: flex;
                        background-color: white;
                        justify-content: space-between;
                    "
                >
                    <div>[걷기왕챌린지]</div>
                    <div>[전체일정]</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div
                        style="
                            color: #3b82f6;
                            font-weight: bold;
                            margin-right: 30px;
                        "
                    >
                        [실시간랭킹경쟁]
                    </div>
                    <div>[아이템아이콘]</div>
                </div>
                <div
                    style="
                        display: flex;
                        background-color: white;
                        color: #3b82f6;
                        font-weight: bold;
                    "
                >
                    <div>[걸음UP!혜택UP!]</div>
                </div>
                <div style="background-color: white">
                    [미션&아이템사용으로걸음수UP!]
                </div>
                <div style="background-color: white">
                    [걷는동안행운복권팡팡!]
                </div>
                <div style="display: flex; background-color: #95a5a6">
                    <div
                        style="
                            background-color: #3b82f6;
                            border-radius: 5px;
                            margin-right: 10px;
                        "
                    >
                        [접수중]
                    </div>
                    <div>[진행중]</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="background-color: #3b82f6">[개인전]</div>
                    <div style="background-color: yellow">
                        {{ challengePoints }}
                    </div>
                    <div style="background-color: coral; margin-right: 30px">
                        {{ challengeCost }}
                    </div>
                    <div style="background-color: darkseagreen">
                        {{ challengeRemainingDays }}
                    </div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="margin-right: 30px; font-weight: bold">
                        {{ commuteChallengeTitle }}
                    </div>
                    <div>[사람아이콘]</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="color: #95a5a6">
                        {{ commuteChallengePeriod }}
                    </div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="margin-right: 30px">[총상금]</div>
                    <div>[참가자]</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="margin-right: 30px">
                        {{ commuteChallengePrize }}
                    </div>
                    <div>{{ commuteParticipantCount }}</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="color: red">{{ commutePrizeChange }}</div>
                </div>
                <div
                    style="
                        background-color: white;
                        border: 1px solid black;
                        border-radius: 5px;
                        text-align: center;
                    "
                >
                    [더보기]
                </div>
                <div style="display: flex; background-color: white">
                    <div>[프라이빗게임]</div>
                    <div>[자세히보기]</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div>[친구들과함께]</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div>[목표달성을해보세요]</div>
                    <div>[아이콘]</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="background-color: darkseagreen; color: white">
                        [게임만들기]
                    </div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="margin-right: 10px; background-color: #6a46c2">
                        [먼저목표도달하기배지]
                    </div>
                    <div style="margin-right: 30px; background-color: coral">
                        [주말영화쏘기배지]
                    </div>
                    <div style="background-color: bisque; font-weight: bold">
                        {{ privateGameRemainingDays }}
                    </div>
                </div>
                <div style="display: flex; background-color: white">
                    <div style="margin-right: 10px">[아이콘]</div>
                    <div style="font-weight: bold">{{ privateGameName }}</div>
                </div>
                <div style="display: flex">
                    <div>{{ privateGamePeriod }}</div>
                </div>
                <div style="display: flex; background-color: white">
                    <div>[현재순위]</div>
                    <div style="font-weight: bold">
                        {{ privateGameCurrentRank }}
                    </div>
                    <div style="font-weight: bold; color: darkseagreen">
                        {{ privateGameStepCount }}
                    </div>
                </div>
                <div style="background-color: white; text-align: center">
                    [프로그래스바]
                </div>
            </div>
        </div>
    </BaseBody>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseBody from "~/components/layout/BaseBody.vue";

definePageMeta({
    isShowTabbar: true,
});

// Top section data
const notificationCount = ref(5); // [알림갯수데이터]
const profileName = ref("김걷기"); // [프로필네임데이터]
const userRegion = ref("서울시"); // [지역데이터]
const userRank = ref("253위"); // [순위데이터]

// User stats data
const totalPrizeMoney = ref("1,234,567원"); // [총상금데이터]
const yearlyPrizeRank = ref("5위"); // [순위데이터]
const totalChallenges = ref("12개"); // [총상금데이터] (챌린지 개수로 해석)

// Challenge section data
const remainingDays = ref("D-7"); // [남은일수]
const challengeTitle = ref("만 보 걷기 챌린지"); // [챌린지제목데이터]
const challengePeriod = ref("2024.01.01 ~ 2024.01.31"); // [챌린지기간데이터]
const challengePrizeAmount = ref("500,000원"); // [총상금금액데이터]
const participantCount = ref("1,234명"); // [참가자수데이터]
const prizeChangeAmount = ref("+10,000원"); // [총상금금액변동데이터]
const currentRank = ref("12위"); // [현재순위데이터]
const rankChange = ref("▲ 3"); // [현재순위변동폭데이터]
const stepCount = ref("8,500 걸음"); // [걸음수데이터]

// Sub-challenge / other challenge section data
const challengePoints = ref("100P"); // [포인트데이터] (챌린지 관련 포인트)
const challengeCost = ref("3,000원"); // [비용데이터] (챌린지 참가 비용)
const challengeRemainingDays = ref("D-5"); // [남은일수데이터] (다른 챌린지의 남은 일수)
const commuteChallengeTitle = ref("출퇴근 러닝 챌린지"); // [출퇴근러닝챌린지데이터]
const commuteChallengePeriod = ref("2024.02.01 ~ 2024.02.29"); // [기간데이터]
const commuteChallengePrize = ref("300,000원"); // [총상금데이터] (출퇴근 챌린지)
const commuteParticipantCount = ref("567명"); // [참가자수데이터] (출퇴근 챌린지)
const commutePrizeChange = ref("+5,000원"); // [총상금데이터변동폭] (출퇴근 챌린지)

// Private game section data
const privateGameRemainingDays = ref("D-2"); // [남은일수데이터] (프라이빗 게임)
const privateGameName = ref("친구들과 함께 10만 걸음"); // [프라이빗게임명]
const privateGamePeriod = ref("2024.03.01 ~ 2024.03.15"); // [기간] (프라이빗 게임)
const privateGameCurrentRank = ref("1위"); // [현재순위데이터] (프라이빗 게임)
const privateGameStepCount = ref("98,765 걸음"); // [걸음수] (프라이빗 게임)
</script>

<style scoped>
/* 여기에 컴포넌트 스코프 스타일을 추가하세요 */
</style>
