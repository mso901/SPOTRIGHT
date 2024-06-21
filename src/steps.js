/** @format */
import dataAnalysis from "./assets/dataAnalysis.png";

const steps = [
	{
		selector: '[data-tour="step-0"]',
		content: () => (
			<>
				{" "}
				<img
					src={dataAnalysis}
					className="data-analysis"
					alt="data analysis"
					style={{ width: "-webkit-fill-available" }}
				/>
				<div>
					<strong>Pearson’s Coefficient: 0.58 (강한 상관관계)</strong>
				</div>
				<div>
					씨씨티비가 증가하면 안전이 강화되고, 범죄 신고율과 검거율이 높아져
					잡히는 범죄 건수가 늘어납니다. 신고율과 검거율이 높아지면서 치안이
					향상됩니다.
				</div>
			</>
		),
	},
	{
		selector: '[data-tour="step-0"]',
		content:
			"CCTV는 범죄가 발생하는 순간을 실시간으로 기록할 수 있습니다. 이를 통해 경찰이나 보안 요원이 신속하게 상황을 파악하고 대응할 수 있습니다. 범죄 신고가 즉각적으로 이루어지면서 대응 시간이 단축되고, 범죄자의 검거 가능성이 높아집니다.",
	},
	{
		selector: '[data-tour="step-1"]',
		content: "치안 점수를 알고 싶은 곳의 주소를 입력해주세요.",
	},
	{
		selector: '[data-tour="step-2"]',
		content:
			"필터를 통해 CCTV, 보안등 개수 등의 치안 상세 내용을 찾아볼 수 있습니다.",
	},
	{
		selector: '[data-tour="step-3"]',
		content: "검색하신 주소의 안전 등급 및 안전 점수를 볼 수 있습니다.",
	},
	{
		selector: '[data-tour="step-4"]',
		content:
			"선택하신 반경에 필터링된 CCTV, 보안등의 개수를 찾아보실 수 있습니다.",
	},
];

export default steps;
