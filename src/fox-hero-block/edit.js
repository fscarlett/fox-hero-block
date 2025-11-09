/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	TextareaControl,
	Button,
	ResponsiveWrapper,
	__experimentalDivider as Divider,
} from "@wordpress/components";

import { useSelect } from "@wordpress/data";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
import metadata from "./block.json";
// import { HeroBlock } from "./components/HeroBlock";

export default function Edit(props) {
	console.log({ props });
	const { className, ...blockProps } = useBlockProps();

	const image1 = useSelect(
		(select) => {
			const imgData = select("core").getEntityRecord(
				"postType",
				"attachment",
				props.attributes.heroImgId,
			);
			return imgData;
		},
		[props.attributes.heroImgId],
	);

	const mainHeroImage = image1 ? image1?.source_url : "";

	const image2 = useSelect(
		(select) => {
			const imgData = select("core").getEntityRecord(
				"postType",
				"attachment",
				props.attributes.mobImgId,
			);
			return imgData;
		},
		[props.attributes.mobImgId],
	);

	const hasMultiButtons =
		props.attributes.heroHasLink2 || props.attributes.heroHasLink3;

	const hero_paragraph_class = !hasMultiButtons
		? "vh-inner-hero-paragraph"
		: "vh-inner-hero-para-multibutton";

	return (
		<>
			<section className={`${className}`} {...blockProps}>
				<div
					className="vh-inner-hero-container gb-container alignfull"
					style={{
						// backgroundImage: `url(${props.attributes.heroImgSourceUrl})`,
						backgroundImage: `url(${mainHeroImage})`,
						backgroundPosition: `center ${props.attributes.imgVertPosition}%`,
					}}
				>
					<div className="gb-container vh-inner-hero-content-container">
						<div className="vh-inner-hero-content-wrapper">
							<h1>{props.attributes.heroTitle}</h1>
							<p className={`${hero_paragraph_class}`}>
								{props.attributes.heroParagraph}
							</p>
							{!!props.attributes.heroHasLink && !hasMultiButtons && (
								<a href={props.attributes.heroLinkUrl}>
									{props.attributes.heroLinkText}
								</a>
							)}

							{!!hasMultiButtons && (
								<div className="vh-inner-hero-multibutton-container">
									{!!props.attributes.heroHasLink && (
										<a
											href={props.attributes.heroLinkUrl}
											className="vh-multi-button"
										>
											{props.attributes.heroLinkText}
										</a>
									)}
									{!!props.attributes.heroHasLink2 && (
										<a
											href={props.attributes.heroLinkUrl2}
											className="vh-multi-button"
										>
											{props.attributes.heroLinkText2}
										</a>
									)}
									{!!props.attributes.heroHasLink3 && (
										<a
											href={props.attributes.heroLinkUrl3}
											className="vh-multi-button"
										>
											{props.attributes.heroLinkText3}
										</a>
									)}
								</div>
							)}
						</div>
					</div>
				</div>

				<div
					className="vh-inner-hero-container-mob gb-container alignfull"
					style={{
						backgroundImage: `url(${props.attributes.heroImgMobSourceUrl})`,
						backgroundPosition: `center ${props.attributes.imgVertPosition}%`,
					}}
				>
					<div className="gb-container vh-inner-hero-content-container">
						<div className="vh-inner-hero-content-wrapper">
							<h1>{props.attributes.heroTitle}</h1>
							<p>{props.attributes.heroParagraph} </p>
							{!!props.attributes.heroHasLink && (
								<a href={props.attributes.heroLinkUrl}>
									{props.attributes.heroLinkText}
								</a>
							)}
							{!!props.attributes.heroHasLink2 && (
								<a href={props.attributes.heroLinkUrl2}>
									{props.attributes.heroLinkText2}
								</a>
							)}
							{!!props.attributes.heroHasLink3 && (
								<a href={props.attributes.heroLinkUrl3}>
									{props.attributes.heroLinkText3}
								</a>
							)}
						</div>
					</div>
				</div>
			</section>

			<InspectorControls>
				<PanelBody title="Hero Section Settings" opened="true">
					<Divider />

					<p>HERO IMAGE</p>

					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={["image"]}
							render={({ open }) => {
								return (
									<button onClick={open} className="vh-img-picker-button">
										Select Hero Image
									</button>
								);
							}}
							value={props.attributes.heroImgId}
							onSelect={(item) => {
								console.log({ item });
								props.setAttributes({
									heroImgId: item.id,
								});
								props.setAttributes({
									pickedHeroImgUrl: item.url,
								});
								console.log({ pickedHeroImgUrl });
							}}
						></MediaUpload>
					</MediaUploadCheck>
					<div className="vh-edit-controls-image-wrapper">
						{!!props.attributes.heroImgId && !!image1?.source_url && (
							<img
								src={image1 ? image1?.source_url : ""}
								height={250}
								width={250}
							/>
						)}
					</div>

					<TextControl
						label="Hero Image Vertical Position"
						help="Enter a number between 0 and 100. This is the percent up or down to align the image as desired."
						value={props.attributes.imgVertPosition}
						onChange={(newValue) => {
							props.setAttributes({ imgVertPosition: newValue });
						}}
					/>

					<Divider />

					<p>MOBILE IMAGE</p>

					<MediaUploadCheck label="Pick Mobile Background Image">
						<MediaUpload
							allowedTypes={["image"]}
							render={({ open }) => {
								return (
									<button onClick={open} className="vh-img-picker-button">
										Select Mobile Image
									</button>
								);
							}}
							value={props.attributes.mobImgId}
							onSelect={(item) => {
								console.log({ item });
								props.setAttributes({
									mobImgId: item.id,
								});
								props.setAttributes({
									pickedMobImgUrl: item.url,
								});
								console.log({ pickedMobImgUrl });
							}}
						></MediaUpload>
					</MediaUploadCheck>
					<div className="vh-edit-controls-image-wrapper">
						{!!props.attributes.mobImgId && !!image2?.source_url && (
							<img
								src={image2 ? image2?.source_url : ""}
								height={170}
								width={170}
							/>
						)}
					</div>

					{/* <TextControl
						label="Hero Image Source Url"
						help="Copy the image url from the Media Library."
						value={props.attributes.heroImgSourceUrl}
						onChange={(newValue) => {
							props.setAttributes({ heroImgSourceUrl: newValue });
						}}
					/> */}

					{/* <TextControl
						label="Mobile Source Url"
						help="Copy the image url from the Media Library."
						value={props.attributes.heroImgMobSourceUrl}
						onChange={(newValue) => {
							props.setAttributes({ heroImgMobSourceUrl: newValue });
						}}
					/> */}

					<Divider />

					<TextControl
						label="Hero Title"
						value={props.attributes.heroTitle}
						onChange={(newValue) => {
							props.setAttributes({ heroTitle: newValue });
						}}
					/>

					<TextareaControl
						label="Hero Paragraph"
						value={props.attributes.heroParagraph}
						onChange={(newValue) => {
							props.setAttributes({ heroParagraph: newValue });
						}}
					/>
					<ToggleControl
						label="Hero Has Link Button"
						checked={props.attributes.heroHasLink}
						onChange={(newValue) => {
							props.setAttributes({
								heroHasLink: newValue,
							});
						}}
					/>
					{!!props.attributes.heroHasLink && (
						<TextControl
							label="Hero Button Link Text"
							value={props.attributes.heroLinkText}
							onChange={(newValue) => {
								props.setAttributes({ heroLinkText: newValue });
							}}
						/>
					)}

					{!!props.attributes.heroHasLink && (
						<TextControl
							label="Hero Button Link Url"
							value={props.attributes.heroLinkUrl}
							onChange={(newValue) => {
								props.setAttributes({ heroLinkUrl: newValue });
							}}
						/>
					)}
					<Divider />

					<ToggleControl
						label="Hero Has Button 2"
						checked={props.attributes.heroHasLink2}
						onChange={(newValue) => {
							props.setAttributes({
								heroHasLink2: newValue,
							});
						}}
					/>
					{!!props.attributes.heroHasLink2 && (
						<TextControl
							label="Hero Button 2 Text"
							value={props.attributes.heroLinkText2}
							onChange={(newValue) => {
								props.setAttributes({ heroLinkText2: newValue });
							}}
						/>
					)}

					{!!props.attributes.heroHasLink2 && (
						<TextControl
							label="Hero Button 2 Link Url"
							value={props.attributes.heroLinkUrl2}
							onChange={(newValue) => {
								props.setAttributes({ heroLinkUrl2: newValue });
							}}
						/>
					)}
					<Divider />

					<ToggleControl
						label="Hero Has Button 3"
						checked={props.attributes.heroHasLink3}
						onChange={(newValue) => {
							props.setAttributes({
								heroHasLink3: newValue,
							});
						}}
					/>
					{!!props.attributes.heroHasLink3 && (
						<TextControl
							label="Hero Button 3 Text"
							value={props.attributes.heroLinkText3}
							onChange={(newValue) => {
								props.setAttributes({ heroLinkText3: newValue });
							}}
						/>
					)}

					{!!props.attributes.heroHasLink3 && (
						<TextControl
							label="Hero Button 3 Link Url"
							value={props.attributes.heroLinkUrl3}
							onChange={(newValue) => {
								props.setAttributes({ heroLinkUrl3: newValue });
							}}
						/>
					)}
					<Divider />
				</PanelBody>
			</InspectorControls>
		</>
	);
}
