<template>
    <BaseBody
        page-title="건강의신"
        logo-type="image"
        :has-notification="true"
        :has-reward="true"
    >
        <div>/common/home</div>
        <StepPerDayChartCard />
        <WalkingProfileCard />
        <MyInputKcalCard style="background-color: #fff" />

        <EventCard />
        <EventCard />
        <OnChalengeCard />
        <OnChalengeCard />
        <ChallengeMainCard
            title="16th 하이워킹 챌린지"
            period="2025.06.15 ~ 06.30"
            :recruitment-days="8"
            :tags="[
                { text: '개인전', color: 'blue' },
                { text: '2,000P', color: 'yellow' },
                { text: '많이걷기', color: 'purple' },
            ]"
            :total-prize="8480000"
            :prize-change="45000"
            :participants="780"
            :participants-change="28"
            image-url="https://placehold.co/160x160"
        />
        <ChallengeMainCard
            title="16th 하이워킹 챌린지"
            period="2025.06.15 ~ 06.30"
            :recruitment-days="8"
            :tags="[
                { text: '개인전', color: 'blue' },
                { text: '2,000P', color: 'yellow' },
                { text: '많이걷기', color: 'purple' },
            ]"
            :total-prize="8480000"
            :prize-change="45000"
            :participants="780"
            :participants-change="28"
            image-url="https://placehold.co/160x160"
        />
        <ChallengeCard
            title="출퇴근 러닝 챌린지"
            period="2025. 06. 15 ~ 2025. 06. 30"
            :remaining-days="34"
            :tags="[
                { text: '개인전', color: 'blue' },
                { text: '3,000P', color: 'yellow' },
                { text: 'FREE', color: 'orange' },
            ]"
            :total-prize="2545000"
            :prize-change="45000"
            :participants="448"
            :current-rank="46"
            :rank-change="23"
            :progress-value="324521"
            :progress-percentage="70"
            image-url="https://placehold.co/160x160"
        />
        <ChallengeCard
            title="출퇴근 러닝 챌린지"
            period="2025. 06. 15 ~ 2025. 06. 30"
            :remaining-days="34"
            :tags="[
                { text: '개인전', color: 'blue' },
                { text: '3,000P', color: 'yellow' },
                { text: 'FREE', color: 'orange' },
            ]"
            :total-prize="2545000"
            :prize-change="45000"
            :participants="448"
            :current-rank="46"
            :rank-change="23"
            :progress-value="324521"
            :progress-percentage="70"
            image-url="https://placehold.co/160x160"
        />
    </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from "~/components/layout/BaseBody.vue";
import EventCard from "~/components/publishing/common/temp/EventCard.vue";
import OnChalengeCard from "~/components/publishing/common/temp/OnChalengeCard.vue";
import WalkingProfileCard from "~/components/publishing/common/temp/WalkingProfileCard.vue";
import MyInputKcalCard from "~/components/publishing/common/temp/MyInputKcalCard.vue";
import StepPerDayChartCard from "~/components/publishing/common/temp/StepPerDayChartCard.vue";
import ChallengeCard from "~/components/publishing/walking/temp/ChallengeCard.vue";
import ChallengeMainCard from "~/components/publishing/walking/temp/ChallengeMainCard.vue";
</script>

<style scoped lang="scss"></style>
