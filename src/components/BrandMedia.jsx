import './BrandMedia.css';

/** The visual slot for a brand, shared by the brands grid, the detail page and
 *  the home section so all three stay consistent as artwork arrives.
 *
 *  Falls through in order: a photo (`image`) fills the band; a logo (`logo`)
 *  sits centred on the brand's own tint; neither, and the band is skipped
 *  entirely rather than filled with a placeholder. */
export default function BrandMedia({ brand, className = '' }) {
  const { image, logo, name } = brand;
  if (!image && !logo) return null;

  return (
    <div className={`bmedia bmedia--${image ? 'photo' : 'logo'} ${className}`.trim()}>
      {image ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={image.alt || `${name} brand image`}
          width={image.w}
          height={image.h}
          loading="lazy"
        />
      ) : (
        <img
          className={`bmedia__logo bmedia__logo--${logo.ratio}`}
          src={logo.src}
          alt={`${name} logo`}
          width={logo.w}
          height={logo.h}
          loading="lazy"
        />
      )}
    </div>
  );
}
