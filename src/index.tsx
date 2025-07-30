import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';
import type { ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setFormSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleToggleSidebar = () => setIsOpen((prev) => !prev);

	const handleApply = () => {
		setSettings(formSettings);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormSettings(defaultArticleState);
		setSettings(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				onToggle={handleToggleSidebar}
				formSettings={formSettings}
				onChange={handleChange}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
