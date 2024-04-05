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

const physiognomyTypes = [
        { name: '철두철미한 계획가 관상', description: '모든 상황에 대비해 체계적인 계획을 세우며, 미래를 대비한 준비를 철저히 합니다. 변화하는 상황에서도 당황하지 않고, 이미 준비된 계획 B, C까지 동원하여 문제를 해결합니다. 이들은 현실적인 사실과 세부 정보에 기반하여 결정을 내리는 데 강점을 가지며, 일의 완성도를 중시합니다. 하지만, 감정 표현에 있어서는 다소 소극적이며 변화에 유연하게 적응하는 데 어려움을 겪을 수 있습니다. ' },
        { name: '연락하면 칼답할 관상', description: '메시지나 요청에 대한 응답을 매우 신속하게 합니다. 타인과의 소통을 중요시하며, 누군가의 연락을 기다리게 하지 않는 것을 미덕으로 여깁니다. 친근하고 활발한 성격의 소유자로, 타인과의 관계를 중시하며 주변 사람들에게 따뜻한 관심을 보냅니다.하지만 때때로 너무 타인의 승인과 인정을 중요시하다 보니 자신의 필요나 감정을 소홀히 할 수 있습니다. 변화보다는 안정성을 추구하며, 주변 환경이나 상황이 예측 가능할 때 가장 편안함을 느낍니다.' },
        { name: '어떤 문제든 해결할 관상', description: '어떠한 문제에도 창의적이고 실용적인 해결책을 제시할 준비가 되어 있습니다. 복잡한 상황 속에서도 해결책을 찾아내는 능력이 뛰어납니다. 독립적이고 자기 주도적인 성향이 강하며, 자신의 능력을 최대한 활용하여 혁신적인 결과를 도출하기 위해 노력합니다. 하지만, 감정적인 면에서 타인과의 교류가 다소 어렵게 느껴질 수 있으며, 너무 이상적이거나 비현실적인 목표를 추구할 때가 있습니다.' },
        { name: '아이디어 100개 있을 관상', description: '머릿속에는 항상 새로운 아이디어가 가득하며, 이를 실현하기 위해 다양한 시도를 두려워하지 않습니다. 창의적인 발상으로 주변 사람들을 놀라게 합니다. 하지만 때때로 현실성이 부족한 아이디어에 몰두하거나, 프로젝트를 마무리 짓는 데 어려움을 겪을 수 있습니다. 융통성이 있고 자유로운 탐구를 선호하며, 계획보다는 즉흥적으로 행동하는 것을 좋아해요.' },
        { name: '공감 잘해줄 것 같은 관상', description: '타인의 감정과 생각에 깊이 공감하는 능력을 지니고 있으며, 타인의 입장에서 생각하는 것을 중요시합니다. 주변을 잘 도와주나 도움 받는 걸 불편해해서 자기 일은 스스로 해결하는 편입니다. 때로는 자신의 이상과 가치를 현실에 맞추려고 할 때 실망하거나 지치기도 합니다. ' },
        { name: '인싸 리더 관상', description: '사교적이고 카리스마 있으며, 모두가 좋아하는 리더 유형입니다. 팀원 또는 친구들 사이에서 중심 역할을 하며, 사람들을 하나로 묶는 데 능숙합니다. 감정적 지원과 격려를 통해 타인의 잠재력을 극대화시키려고 합니다. 때때로 너무 많은 사람을 돕고자 하는 바람에 자신의 욕구를 무시할 수 있습니다.' },
        { name: '질문 많이 할 관상', description: '끝없는 질문으로 세상과 사물에 대한 깊은 이해를 추구합니다. 지식에 대한 갈증이 많으며, 배움에 있어서 적극적입니다. 자유로운 사고와 개방성을 가지고 있으나, 때로는 과도한 분석으로 인해 결정을 내리기까지 많은 시간이 소요될 수 있습니다. 계획과 구조보다는 융통성 있고 적응적인 접근 방식을 선호합니다.' },
        { name: '멱살 잡고 이끌어줄 리더 관상', description: '목표 달성을 위해 팀을 엄격하게 이끄는 리더십을 발휘합니다. 때로는 권위적일 수 있지만, 그만큼의 성과를 이끌어냅니다. 객관적이고 논리적인 접근을 중요시하며, 감정보다는 사실에 기반한 결정을 선호합니다. 계획을 세우고 목표를 달성하는 데 집중하며, 구조화된 환경에서 최고의 성과를 발휘합니다.' },
        { name: '하고 싶은거 다 할 관상', description: '자신이 원하는 것을 하는 데 주저함이 없으며, 개인의 자유와 독립을 중요시합니다. 타인의 시선보다는 자신의 만족을 우선합니다.하지만 때때로 장기적인 계획보다는 순간의 즐거움을 우선시하여 미래에 대한 준비가 부족할 수 있습니다. ' },
        { name: '혼자서도 잘 먹고 잘 살 관상', description: '자립심이 강하며, 혼자서도 잘 해낼 수 있는 능력을 지녔습니다. 일상생활에서의 독립적인 결정과 행동을 중요시합니다. 현실적인 해결책을 찾는 데 능숙하며, 복잡한 문제를 간단하게 분석하는 능력이 탁월합니다. 감정보다는 논리와 사실에 기반하여 의사결정을 하지만, 때로는 너무 과도한 분석으로 인해 타인과의 감정적 교류에 어려움을 겪을 수 있습니다.' },
        { name: '누워있는거 좋아할 관상', description: '편안함과 안락함을 추구하며, 최소한의 노력으로 최대한의 결과를 원합니다. 일상에서 소소한 행복을 찾는 데 능숙합니다. 창의력이 뛰어나며, 자신의 감정을 예술적인 방법으로 표현하는 데 재능이 있습니다. 하지만 때로는 감정의 기복이 심하고, 외부 세계와의 충돌에서 상처받기 쉽습니다.' },
        { name: '무인도에서도 살아남을 관상', description: '어떠한 환경에서도 적응하고 생존할 수 있는 능력을 가지고 있습니다. 도전적인 상황에서도 침착함을 유지하며, 주어진 자원으로 최선의 결과를 도출해냅니다. 에너지가 넘치며 새롭고 흥미로운 경험을 추구하며 위험을 두려워하지 않습니다. 하지만 때로는 충동적인 행동이나 단기적인 즐거움을 추구하다가 장기적인 결과를 고려하지 않는 경우가 있습니다.' },
        { name: '친구 3824명일 것 같은 관상', description: '사교적이고 넓은 인맥을 자랑합니다. 어디서든 쉽게 친구를 만들고, 다양한 사람들과의 관계를 잘 유지합니다. 개방적이고 호기심이 많아 다양한 사람들과 아이디어에 관심을 가집니다. 하지만 때때로 너무 많은 것에 관심을 가지다 보니 중점을 두어야 할 일에 집중하는 데 어려움을 겪을 수 있습니다. ' },
        { name: '계획만 세우고 실천 안할 관상', description: '아이디어와 계획은 많지만, 실제로 실행에 옮기는 데는 어려움을 겪습니다. 꿈과 계획을 현실로 만드는 데 있어서 보다 구체적인 노력이 필요합니다. 주변 사람들을 동기부여하고 이끌어가는 능력이 뛰어나며, 복잡한 문제를 해결하는 데 강점을 보입니다. 하지만 때때로 지나치게 목표에 집중하다 보니 타인의 감정이나 의견을 충분히 고려하지 않는 경우가 있습니다. ' },
        { name: '약속 취소되면 좋아할 관상', description: '혼자만의 시간을 즐기며, 예상치 못한 자유 시간이 주어졌을 때 더 큰 만족을 느낍니다. 자기 자신과의 대화를 중요시하며, 이 시간을 통해 에너지를 재충전합니다. 창의력과 상상력이 뛰어나며, 개인적인 경험을 통해 세상을 이해하려고 합니다. 때때로 현실 세계의 요구와 충돌이 일어날 수 있으며, 외부의 비판이나 거부에 민감하게 반응할 수 있습니다.' },
        { name: '관심이 필요한 관상', description: '주변 환경과 사람들에 대한 세심한 관찰을 통해 깊은 통찰력을 가집니다. 관찰을 통해 얻은 정보를 바탕으로 신중한 판단을 내리는 데 능숙합니다. 이들은 지적인 논쟁을 즐기며, 다양한 관점에서 사물을 바라볼 수 있는 능력을 지니고 있습니다. 새로운 것을 배우고 탐험하는 것에 대한 열정이 강하며, 기존의 관념이나 규칙에 도전하는 것을 두려워하지 않습니다. 하지만 때로는 주의를 산만하게 하거나 프로젝트를 완성하기 전에 관심을 잃을 수 있습니다.' },
    ];

    // physiognomyTypes 배열에서 랜덤 유형 선택 및 표시
    const index = Math.floor(Math.random() * physiognomyTypes.length);
    const selectedType = physiognomyTypes[index];
    
    // 결과 섹션에 유형명과 설명 표시
    document.getElementById("typeTitle").innerText = selectedType.name;
    document.getElementById("typeDescription").innerText = selectedType.description;
    
    // 결과 섹션 표시
    document.getElementById("results").style.display = "block";

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