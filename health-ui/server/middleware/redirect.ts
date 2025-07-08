export default defineEventHandler((event) => {
    const { req } = event.node;
    const url = req.url || "";
    const method = req.method || "";

    // /common/home에 대해서는 아무 처리도 하지 않음 (가장 우선)
    if (url === "/common/home") {
        return; // 여기서 완전히 종료
    }

    // 루트 경로만 /guide/PubList로 리다이렉트 (퍼블용 확인 페이지)
    if (url === "/" || url === "") {
        console.log("[REDIRECT] Redirecting ROOT to /guide/PubList");
        return sendRedirect(event, "/guide/PubList", 301);
    }
});
