import { FC, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface Props {
	isOpen: boolean;
	onToggle: () => void;
	formSettings: ArticleStateType;
	onChange: (key: keyof ArticleStateType, value: OptionType) => void;
	onApply: () => void;
	onReset: () => void;
}

export const ArticleParamsForm: FC<Props> = ({
	isOpen,
	onToggle,
	formSettings,
	onChange,
	onApply,
	onReset,
}) => {
	const asideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onToggle]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}
			>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply();
					}}
				>
					<Text as="h2" size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title="Шрифт"
						options={fontFamilyOptions}
						selected={formSettings.fontFamilyOption}
						onChange={(value) => onChange('fontFamilyOption', value)}
					/>

					<RadioGroup
						name="radioGroupName"
						title="Размер шрифта"
						options={fontSizeOptions}
						selected={formSettings.fontSizeOption}
						onChange={(value) => onChange('fontSizeOption', value)}
					/>

					<Select
						title="Цвет шрифта"
						options={fontColors}
						selected={formSettings.fontColor}
						onChange={(value) => onChange('fontColor', value)}
					/>

					<Separator />

					<Select
						title="Цвет фона"
						options={backgroundColors}
						selected={formSettings.backgroundColor}
						onChange={(value) => onChange('backgroundColor', value)}
					/>

					<Select
						title="Ширина контента"
						options={contentWidthArr}
						selected={formSettings.contentWidth}
						onChange={(value) => onChange('contentWidth', value)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title="Сбросить"
							htmlType="button"
							type="clear"
							onClick={onReset}
						/>
						<Button title="Применить" htmlType="submit" type="apply" />
					</div>
				</form>
			</aside>
		</>
	);
};
