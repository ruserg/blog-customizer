import { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';

import { useClose } from 'src/hooks/useClose';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface Props {
	onApply: (settings: ArticleStateType) => void;
}

export const ArticleParamsForm: FC<Props> = ({ onApply }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formSettings, setFormSettings] = useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement>(null);

	const handleToggleSidebar = () => setIsMenuOpen((prev) => !prev);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setFormSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formSettings);
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		setFormSettings(defaultArticleState);
		onApply(defaultArticleState);
		setIsMenuOpen(false);
	};

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: asideRef,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggleSidebar} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
			>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as="h2" size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title="Шрифт"
						options={fontFamilyOptions}
						selected={formSettings.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
					/>

					<RadioGroup
						name="fontSize"
						title="Размер шрифта"
						options={fontSizeOptions}
						selected={formSettings.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
					/>

					<Select
						title="Цвет шрифта"
						options={fontColors}
						selected={formSettings.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
					/>

					<Separator />

					<Select
						title="Цвет фона"
						options={backgroundColors}
						selected={formSettings.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
					/>

					<Select
						title="Ширина контента"
						options={contentWidthArr}
						selected={formSettings.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
					/>

					<div className={styles.bottomContainer}>
						<Button title="Сбросить" htmlType="button" type="clear" onClick={handleReset} />
						<Button title="Применить" htmlType="submit" type="apply" />
					</div>
				</form>
			</aside>
		</>
	);
};
