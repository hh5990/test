document.getElementById("imageInput").onchange = function() {
    const reader = new FileReader();
    reader.onload = function(e) {
        const uploadedImage = document.getElementById("uploadedImage");
        uploadedImage.src = e.target.result;
        uploadedImage.style.display = "block"; // 이미지를 보여줌
        const uploadIcon = document.getElementById("uploadIcon");
        uploadIcon.style.display = "none"; // + 아이콘 숨김
    };
    reader.readAsDataURL(this.files[0]);
};

function generateCharacterTraits() {
    
    var imageInput = document.getElementById("imageInput");
    if (imageInput.files.length === 0) {
        // 파일이 첨부되지 않았다면 경고 메시지 표시
        alert("이미지를 첨부해주세요.");
        return; // 함수 실행을 여기서 중단
    }

    // 이미지가 첨부되었다면, 여기에 결과를 처리하고 표시하는 코드를 작성
    document.getElementById("results").style.display = "block";
    document.getElementById("viewResultsButton").style.display = "none"; // '결과 보기' 버튼 숨김
    document.getElementById("redoButton").style.display = "block"; // '다시하기' 버튼 표시
    document.getElementById("uploadContainer").style.borderStyle = "none";

     // 이미지 업로드 기능 비활성화
     document.getElementById("imageInput").disabled = true;
    
        // 결과 생성 로직...

    // '결과 보기' 버튼을 숨기고 '다시하기' 버튼을 표시
    document.getElementById("viewResultsButton").style.display = 'none';
    document.getElementById("redoButton").style.display = 'block';
    document.getElementById("shareButton").style.display = 'block';

    // 결과 섹션을 보이게 함
    document.getElementById("results").style.display = "block";

    const personalityTraits = [
    "모험을 사랑하는 탐험가! 항상 새로운 것에 도전하는 것을 두려워하지 않고, 미지의 세계를 탐험하는 것에서 큰 즐거움을 느낍니다. 일상의 틀을 깨고 모험을 추구하며, 새로운 경험을 통해 성장하는 것을 가치 있게 여겨요",

    "신중한 전략가! 모든 상황에서 침착함을 유지하고, 문제 해결에 있어서 체계적이고 전략적인 접근 방식을 선호합니다. 복잡한 상황을 분석하고 최선의 해결책을 찾아내는 데 능숙합니다.",
    
    "창의적인 예술가! 예술과 창의성에 대한 깊은 열정을 가지고 있으며, 자신만의 독특한 아이디어로 새로운 것을 창조하는 것을 사랑합니다. 일상적인 것에서도 영감을 받고, 그것을 자신만의 방식으로 표현하는 데 재능이 있어요.",
    
    "사교적인 친구! 다양한 사람들과 소통하는 것을 즐기며, 어떤 모임에서든 중심에 서는 것을 좋아합니다. 친구들과의 관계를 소중히 여기며, 새로운 사람들을 만나는 것에 열린 마음을 가지고 있어요.",
    
    "고요한 명상가! 혼자만의 시간을 가치 있게 여기며, 내면의 목소리에 귀 기울이는 것을 선호합니다. 깊은 생각에 잠기는 것을 좋아하며, 자기 성찰을 통해 자신의 정체성과 가치를 탐구해요.",
    
    "대담한 리더! 자신감이 넘치고 어떤 상황에서도 리더십을 발휘하여 사람들을 이끌 수 있습니다. 도전적인 상황에서도 두려움 없이 앞장서며, 목표를 향해 나아가는 데 주저함이 없어요.",
    
    "따뜻한 이해자! 타인에 대한 깊은 이해와 공감 능력을 가지고 있으며, 누군가가 어려움에 처했을 때 옆에서 위로와 지지를 아끼지 않습니다. 사람들과의 진정한 관계를 중요시하며, 항상 따뜻한 마음을 가지고 있어요.",
    
    "재치 있는 유머리스트! 유머를 통해 사람들을 웃게 하는 것을 즐기며, 긍정적인 에너지로 주변 분위기를 밝게 만듭니다. 재치 있는 농담으로 어떤 상황에서도 긴장을 풀어주는 능력이 있어요.",
    
    "질서 정연한 계획가! 모든 일에 있어서 질서와 계획을 중요시하며, 체계적으로 목표를 설정하고 달성해 나갑니다. 예상치 못한 변화보다는 안정적이고 예측 가능한 환경을 선호해요.",
    
    "강인한 독립가! 자신의 길을 스스로 결정하고 독립적으로 문제를 해결하는 데 능숙합니다. 다른 사람의 도움을 기대하기보다는 자신의 힘으로 어려움을 극복하고자 하는 의지가 강하며, 자유롭고 독립적인 생활을 추구해요. 주변의 영향을 쉽게 받지 않으며, 자신만의 신념과 가치관에 따라 행동하는 것을 중요하게 여깁니다."];
    
    const likes = ["자연을 좋아해요. 조용한 숲 속 산책이나 해변의 일몰을 바라보며 평화와 안정을 찾는 것을 좋아합니다. 자연의 아름다움 속에서 스스로를 재충전하고 영감을 받습니다.",
    "음악을 좋아해요. 다양한 장르의 음악을 듣고, 그 속에서 감정을 공유하고 이해를 깊게 하는 것을 사랑합니다. 음악은 기분을 전환시키고 새로운 에너지를 주는 원천입니다.",
    "책을 좋아해요. 책을 통해 지식을 탐구하고, 다른 사람들의 삶과 경험을 간접적으로 체험하는 것을 좋아합니다. 독서는 마음을 넓히고 사고를 깊게 합니다.",
    "영화를 좋아해요. 다양한 영화를 보며 그 속에 담긴 이야기와 감정에 몰입하는 것을 즐깁니다. 영화는 새로운 세계로의 창문과 같습니다.",
    "여행을 좋아해요. 새로운 장소를 탐험하고, 다른 문화를 경험하는 것에서 오는 설렘을 사랑합니다. 여행은 삶을 풍부하게 하고 시야를 넓혀줍니다.",
    "맛있는 음식을 좋아해요. 다양한 음식을 시도하고, 새로운 맛을 발검하는 것을 좋아합니다. 음식은 삶의 큰 즐거움 중 하나입니다.",
    "스포츠에 열정이 있어요. 스포츠 경기를 보거나 직접 참여하며 느끼는 열정과 도전 정신을 즐깁니다. 스포츠는 건강을 유지하고 정신을 단련시킵니다.",
    "그림을 그리거나 조각하는 등 자신만의 예술 작품을 창작하는 과정에서 큰 만족을 느낍니다. 예술은 자신을 표현하는 중요한 수단입니다.",
    "과학적 발견과 실험을 통해 세상을 이해하려는 시도를 좋아합니다. 과학은 끊임없는 호기심을 충족시켜줍니다.",
    "새로운 기술을 배우고, 그것을 활용하여 삶을 개선하는 방법을 찾는 것에 흥미를 느낍니다. 기술은 끊임없이 변화하는 세상에서 발전의 열쇠입니다."];
    
    const dislikes = ["부정적인 태도와 불평을 싫어해요. 주변 사람들의 부정적인 태도와 끊임없는 불평은 에너지를 소모시켜요. 긍정적인 생각과 태도가 중요하다고 믿으며, 어려움 속에서도 희망을 찾으려고 노력합니다.",

    "무례함과 불쾌한 행동을 싫어해요. 타인에 대한 기본적인 예의와 존중은 모든 인간 관계의 기초입니다. 무례하고 공격적인 행동을 하는 사람이 있다면 즉시 거리를 두는 편입니다.",
    
    "지나친 혼잡과 소음을 싫어해요. 조용하고 평화로운 환경을 선호합니다. 시끄러운 장소나 너무 많은 사람이 모인 곳은 스트레스를 주며, 이런 환경을 가능한 피하려고 합니다.",
    
    "변화를 피하는 걸 싫어해요. 새로운 아이디어나 변화를 두려워하고 받아들이지 않는 태도는 발전을 저해한다고 생각해요. 개방적인 마인드로 새로운 가능성을 탐색하는 것을 중요시합니다.",
    
    "비효율적인 시간 관리를 싫어해요. 시간은 소중한 자원입니다. 목표 없이 시간을 낭비하거나, 약속을 지키지 않는 행동을 좋아하지 않습니다.",
    
    "폐쇄적인 사고방식을 싫어해요. 다양성과 차이를 인정하지 않고, 자신의 생각만 옳다고 주장하는 태도는 발전에 장애가 된다고 생각해요. 서로 다른 의견과 관점을 수용하는 것이 성장의 열쇠!",
    
    "무책임한 행동을 싫어해요. 자신의 행동과 결정에 책임을 지지 않는 사람들은 신뢰하기 어려워요. 모든 행동에는 그에 상응하는 책임이 따른다고 믿습니다.",
    
    "편협한 세계관을 싫어해요. 한정된 시각에서만 세상을 바라보고, 다른 문화나 가치를 배척하는 태도는 개인적인 성장을 제한합니다. 세계는 다양하고 복잡하며, 그 다양성에서 배울 점이 많습니다.",
    
    "단기적인 생각을 싫어해요. 단기적인 이익만을 추구하고, 장기적인 결과나 영향을 고려하지 않는 결정은 결국 더 큰 문제를 야기할 수 있어요. 지속 가능성과 미래를 생각하는 접근이 필요합니다.",
    
    "지나친 경쟁심을 싫어해요. 건전한 경쟁은 자극제가 될 수 있지만, 지나친 경쟁심은 관계를 해치고 개인의 복지를 저해할 수 있어요. 협력과 공유의 가치를 더 높이 평가합니다."];
    const hobbies = ["취미는 정원 가꾸기입니다. 자연과 가까워지고 싶을 때, 정원 가꾸기는 가장 마음이 편안해지는 활동 중 하나입니다. 식물의 성장 과정을 지켜보는 것은 시간과 노력이 필요하지만, 그 과정에서 얻는 성취감과 평온함은 이루 말할 수 없어요.",


    "취미는 사진 촬영이에요. 사진은 순간을 영원히 기록하는 마법과도 같아요. 일상 속 평범한 순간들조차도 특별한 의미를 지니게 해요. 사진은 그 순간의 감정과 기억을 담고 있어, 나중에 돌아봤을 때 그때의 추억을 생생하게 되살릴 수 있습니다.",
    
    
    "취미는 요리입니다. 다양한 재료와 조합을 실험하며 나만의 레시피를 만들어 가는 과정에 재미를 느껴요. 요리를 통해 세계 각국의 문화와 맛을 경험할 수 있으며, 가족이나 친구들과 함께 맛있는 식사를 나누는 시간은 삶의 진정한 행복을 느끼게 해줍니다.",
    
    
    "취미는 등산과 하이킹입니다. 산을 오르는 것은 몸과 마음에 활력을 주는 활동입니다. 자연 속에서 느끼는 신선한 공기와 아름다운 풍경은 도시 생활의 스트레스에서 벗어나게 해주며, 정상에 도달했을 때의 성취감은 말로 표현할 수 없어요.",
    
    "취미는 그림 그리기입니다. 캔버스 위에 자신의 감정과 상상을 자유롭게 표현하는 것에서 큰 만족을 느낍니다. 다양한 색상과 기법을 사용하여 내면의 세계를 시각화하며, 이 과정에서 스트레스를 해소하고 창의력을 발휘합니다.",
    
    "취미는 글쓰기입니다. 생각과 경험을 글로 표현하는 과정에서 큰 기쁨을 얻어요. 자신만의 이야기를 창조하거나 일기를 통해 일상을 기록함으로써 내면을 탐구하고 정리할 수 있습니다. 글쓰기는 또한 공감과 소통의 수단으로, 다른 이들과 깊이 있는 연결을 만들어낼 수 있습니다.",
    
    "취미는 요가와 명상입니다. 신체적, 정신적 건강을 유지하기 위해 요가와 명상을 즐깁니다. 몸과 마음의 균형을 찾고 스트레스를 완화시키며, 일상에서의 집중력과 평온함을 높일 수 있어요. 요가와 명상은 자기 자신과의 대화를 통해 내면의 평화를 찾는 시간입니다.",
    
    "취미는 여행입니다. 새로운 곳을 방문하고 다양한 문화를 경험하는 여행은 삶에 활력을 불어넣습니다. 각 여행에서 만나는 사람들, 맛보는 음식, 보는 풍경은 소중한 추억과 배움을 제공합니다. 여행은 나의 시야를 넓히고, 세상을 다른 관점에서 바라볼 수 있게 해줍니다.",
    
    "취미는 영화 감상입니다. 다양한 장르의 영화를 감상하며, 감독의 창의력과 배우의 연기를 분석하는 것을 좋아해요. 영화는 이야기를 통해 다른 사람의 삶과 감정을 경험하게 해주며, 때로는 큰 감동이나 깊은 생각을 자아내기도 합니다.",
    
    "취미는 보드게임과 퍼즐입니다. 친구나 가족과 함께 보드게임이나 퍼즐을 푸는 시간은 즐거워요. 전략적 사고와 팀워크를 발휘할 수 있으며, 함께하는 시간을 통해 관계를 더욱 돈독히 합니다."];

    const index = Math.floor(Math.random() * personalityTraits.length);
    const trait = personalityTraits[index];

    // 결과 섹션을 보여줌
    document.getElementById("results").style.display = "block";

    // 무작위로 특성을 선택하여 표시
    document.getElementById("personality").innerText = personalityTraits[Math.floor(Math.random() * personalityTraits.length)];
    document.getElementById("likes").innerText = likes[Math.floor(Math.random() * likes.length)];
    document.getElementById("dislikes").innerText = dislikes[Math.floor(Math.random() * dislikes.length)];
    document.getElementById("hobbies").innerText = hobbies[Math.floor(Math.random() * hobbies.length)];


}

function redoTest() {
    // '다시하기' 버튼을 숨기고 '결과 보기' 버튼을 다시 표시
    document.getElementById("viewResultsButton").style.display = 'block';
    document.getElementById("redoButton").style.display = 'none';
    document.getElementById("shareButton").style.display = 'none';

    // 결과 영역 숨기기 (옵션)
    document.getElementById("results").style.display = 'none';

    // 이미지 입력 필드를 초기화 (옵션)
    document.getElementById("imageInput").value = '';
    
    // 업로드 컨테이너의 점선 테두리를 다시 추가
    document.getElementById("uploadContainer").style.borderStyle = 'dashed';

     // 이미지 업로드 기능 활성화
     document.getElementById("imageInput").disabled = false;

    // + 아이콘을 다시 표시하고 업로드된 이미지 숨기기 (옵션)
    document.getElementById("uploadIcon").style.display = 'block';
    const uploadedImage = document.getElementById("uploadedImage");
    if (uploadedImage) {
        uploadedImage.style.display = 'none';
        uploadedImage.src = ''; // 이미지 소스 초기화
    }
}

function copyURLToClipboard() {
    // 현재 페이지의 URL 가져오기
    const url = window.location.href;

    // URL을 클립보드에 복사하기
    navigator.clipboard.writeText(url).then(() => {
        alert("URL이 클립보드에 복사되었습니다. 원하는 곳에 붙여넣어 공유하세요!");
    }).catch(err => {
        console.error('클립보드 복사에 실패했습니다: ', err);
    });
}