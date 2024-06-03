import { CmAppBar } from 'shared/components';

function HideAppBarPage() {
  // this should be a redux state
  const isHidden = false;

  return <>{isHidden && <CmAppBar onShowMenu={} />}</>;
}
