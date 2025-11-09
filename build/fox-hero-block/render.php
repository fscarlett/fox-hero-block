<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php // echo get_block_wrapper_attributes(); ?>

<?php	
// thiings may happen here 
// $hero_img_url = $attributes['pickedHeroImgUrl'];
$hero_title = $attributes['heroTitle'] ? $attributes['heroTitle'] : get_the_title();
?>

<section>
					<!-- desktop -->				
        <div
          class="vh-inner-hero-container gb-container alignfull"
          style=
            "background-image: url(<? echo $attributes['pickedHeroImgUrl'] ?>);
            background-position: center <? echo $attributes['imgVertPosition'] ?>%;
            min-height: 600px;"
          
        >
          <div class="gb-container vh-inner-hero-content-container">
            <div class="vh-inner-hero-content-wrapper">
							<!-- <h1>hello people</h1> -->
              <h1><? echo $hero_title; ?></h1>
              <p class="vh-inner-hero-paragraph"><? echo $attributes['heroParagraph']; ?></p>
              

             

            </div>
          </div>
        </div>

        <!-- mobile -->
        <div
          class="vh-inner-hero-container-mob gb-container alignfull"
          style=
            "background-image: url(<? echo $attributes['pickedMobImgUrl'] ?>);
            background-position: center <? echo $attributes['imgVertPosition'] ?>%;"
          
        >
          <div class="gb-container vh-inner-hero-content-container">
            <div class="vh-inner-hero-content-wrapper">
              <h1><? echo $attributes['heroTitle']; ?></h1>
              <p><? echo $attributes['heroParagraph']; ?></p>
              
             
            </div>
          </div>
        </div>

      </section>


			<? 