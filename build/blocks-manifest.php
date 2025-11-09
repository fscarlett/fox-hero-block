<?php
// This file is generated. Do not modify it manually.
return array(
	'fox-hero-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/fox-hero-block',
		'version' => '0.1.0',
		'title' => 'Fox Hero Block',
		'category' => 'widgets',
		'icon' => 'superhero',
		'description' => 'Gutenberg block for simple hero section.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'heroImgId' => array(
				'type' => 'number',
				'default' => '0'
			),
			'pickedHeroImgUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'mobImgId' => array(
				'type' => 'number',
				'default' => '0'
			),
			'pickedMobImgUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'heroImgSourceUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'heroImgMobSourceUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'imgVertPosition' => array(
				'type' => 'string',
				'default' => '0'
			),
			'heroTitle' => array(
				'type' => 'string',
				'default' => ''
			),
			'heroParagraph' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'fox-hero-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
