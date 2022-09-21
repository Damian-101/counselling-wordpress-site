import { InnerBlocks, useBlockProps, RichText } from "@wordpress/block-editor";
import { useState, useEffect } from "react";
import FullWidthErrorMsg from "../components/full-width-error-msg";
import RenderLoadingScreen from "../components/loadingScreen";
import Sidebar from "./customize/sidebar";
import "swiper/css";
import "./scss/index.scss";
// import SelectItem from "../components/SelectItem";
import Toolbar from "./customize/toolbar";
import "./js/add-posts.js";
import {
  GuternbergBlockConfig,
  SearchBar,
  NavBar,
  NavGroup,
  NavItem,
  DropdownSm,
  NavButton,
  SelectItem,
  Popup,
  Dropdown,
  DropdownItem,
  PopupGroup,
  PopupItem,
  NumberInputControl,
  ToggleBtn,
} from "crafts-components-library";

const Edit = (props) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [staticPostsData, setStaticPostsData] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [isStaticPosts, setIsStaticPosts] = useState(true);
  const [sortByType, setSortByType] = useState();
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isFilterPostDropdownOpen, setIsFilterPostDropdownOpen] =
    useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [advanceMaxPostCount, setAdvanceMaxPostCount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState();
  const [selectPostByAdvanceOption, setSelectPostByAdvanceOption] =
    useState("Recent Posts");
  const [showIsSelectedPosts, setShowIsSelectedPosts] = useState(false);
  const [isDynamicPosts, setIsDynamicPosts] = useState(false);
  const [isPopupRendered, setIsPopupRendered] = useState(false);
  const [dynamicPostsData, setDynamicPostsData] = useState();
  const blockProps = useBlockProps();
  const domainName = window.location.origin;
  const TEMPLATE = [["core/heading", { textAlign: "center" }]];
  const postsPerView = 12;
  const minPostCount = 5

  //attributes
  const staticPosts = props.attributes.staticPosts;
  const url = props.attributes.url;
  const opensInNewTab = props.attributes.opensInNewTab;
  const dynamicPosts = props.attributes.dynamicPosts;
  const staticPostsPreLoadData = props.attributes.staticPostsPreLoadData;
  const isDynamicArticles = props.attributes.isDynamicArticles;
  const dynamicPostSelectCount = props.attributes.dynamicPostSelectCount;
  const isConfig = props.attributes.isConfig;
  console.log(staticPostsPreLoadData);


  useEffect(() => {
    articalsCarousel()
  })

  // set info after fetch
  useEffect(() => {
    fetchData("per_page=" + postsPerView).then(
      (values) => {
        setData(values);
      },
      (reason) => {
        console.log(reason);
      }
    );
  }, []);

  useEffect(() => {
    if (sortByType) {
      if (sortByType.toLowerCase() === "date") {
        fetchSortedPost("date");
      }
      if (sortByType.toLowerCase() === "modified") {
        fetchSortedPost("modified");
      }
      if (sortByType.toLowerCase() === "title") {
        fetchSortedPost("title");
      }
    }
  }, [sortByType]);

  useEffect(() => {
    //reset select data if dynamic posts
    if (isStaticPosts === false) {
      setSelectedData([]);
    }
  }, [isStaticPosts]);

  //set saved data
  useEffect(() => {
    //set dynamic post count
    console.log(dynamicPostSelectCount);
    //set dynamic posts
    setIsDynamicPosts(isDynamicArticles);
    setIsStaticPosts(!isDynamicArticles);
    if (isDynamicArticles === true) {
      setAdvanceMaxPostCount(dynamicPostSelectCount);
      // advancePostSelect();
    }
    //selected ids
    if (staticPosts[0]) {
      setSelectedValues(staticPosts);
    }
    //Pre load selected data
    setSelectedData([...staticPostsPreLoadData]);
  }, []);

  useEffect(() => {
    if (isDynamicPosts === true) {
      // setAdvanceMaxPostCount(dynamicPostSelectCount);
      advancePostSelect();
    }
  },[isDynamicPosts])

  useEffect(() => {
    addSearchData();
  }, [selectedValues]);

  //filter and add searchData
  const addSearchData = () => {
    //add selected search post data to selected data array
    let selectSearchData = [];
    searchData.map((artical) => {
      if (selectedValues.includes(artical.id) === true) {
        selectSearchData = [...selectSearchData, artical];
      }
    });
    let searchDataCombined = [...selectedData, ...selectSearchData];
    if (selectSearchData[0]) {
      //check if theres duplicates in selectedData
      searchDataCombined = searchDataCombined.filter(
        (value, index, array) =>
          array.findIndex((value2) => value2.id === value.id) === index
      );
      //check if the search data is still selected
      let selectedSearchData = [];
      searchDataCombined.map((data) => {
        console.log(selectedValues.includes(data.id) === true);
        if (selectedValues.includes(data.id) === true) {
          selectedSearchData = [...selectedSearchData, data];
        }
      });
      setSelectedData(selectedSearchData); //Add Article To Selected Data
    }
  };

  useEffect(() => {
    if (isConfig === false) {
      if (isDynamicArticles === false) {
        fetchData("include=" + staticPosts).then((values) =>
          setStaticPostsData(values)
        );
      } else {
        if (
          dynamicPosts &&
          dynamicPosts.type.toLowerCase() === "recent posts"
        ) {
          fetchData(
            "per_page=" + dynamicPosts.count + "&orderby=date&order=asc"
          ).then((values) => {
            setDynamicPostsData(values);
          });
        }
      }
    }
  }, [isConfig]);

  useEffect(() => {
    console.log(selectedData);
  }, [selectedData]);
  useEffect(() => {
    console.log(selectedValues);
  }, [selectedValues]);

  //fetch search data in searched
  useEffect(() => {
    if (searchValue !== "") {
      setIsFetching(true);
      fetchData("search=" + searchValue).then((values) =>
        setSearchData(values)
      );
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchValue]);

  //fetch customer Articals data
  const fetchData = async (args) => {
    const url = domainName + "/wp-json/wp/v2/posts?_embed&" + args;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (!data.code) {
            resolve(data);
            setIsFetching(false);
          } else {
            reject(data.code);
            setIsFetching(false);
          }
        })
        .catch((err) => {
          setIsFetching(false);
        });
    });
  };

  ////////////////////////////////////////////////////////
  /////////////////////Artical Ui/////////////////////////
  ////////////////////////////////////////////////////////
  const renderArticalsUi = () => {
    //Render Dynamic Posts
    //Render Static Post
    let articalUi;
    if (staticPostsData && isDynamicArticles === false) {
      articalUi = staticPostsData.map((artical) => {
        const imgObj = artical._embedded["wp:featuredmedia"];
        return (
          <div className="swiper-slide">
            <a href={artical.link} className="cs-articals__link">
              <div className="cs-articals__artical">
                <img
                  src={imgObj[0].source_url}
                  alt={imgObj[0].alt_text}
                  className="cs-articals__artical-img"
                />
                <h5 className="cs-articals__artical-artical-title">
                  {artical.title.rendered}
                </h5>
              </div>
            </a>
          </div>
        );
      });
    } else if (dynamicPostsData) {
      console.log(dynamicPostsData);
      articalUi = dynamicPostsData.map((artical) => {
        const imgObj = artical._embedded["wp:featuredmedia"];
        return (
          <div className="swiper-slide">
            <a href={artical.link} className="cs-articals__link">
              <div className="cs-articals__artical">
                <img
                  src={imgObj[0].source_url}
                  alt={imgObj[0].alt_text}
                  className="cs-articals__artical-img"
                />
                <h5 className="cs-articals__artical-artical-title">
                  {artical.title.rendered}
                </h5>
              </div>
            </a>
          </div>
        );
      });
    }
    return (
      <div className="cs-articals-block">
        {/* heading  */}
        <div className="cs-articals-block__top">
          <InnerBlocks
            template={TEMPLATE}
            className="cs-articals cs-heading"
            templateLock="all"
          />
          <div className="cs-articals-block__top-view-all">
            <a
              href={url && url}
              className="cs-articals-block__top-view-all__wraper"
              target={opensInNewTab && opensInNewTab ? "_blank" : "_self"}
            >
              <h6 className="cs-articals-block__top-view-all__name">
                VIEW ALL
              </h6>
              <svg
                className="cs-articals-block__top-view-all__icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM406.6 278.6l-103.1 103.1c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L306.8 288H128C110.3 288 96 273.7 96 256s14.31-32 32-32h178.8l-49.38-49.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l103.1 103.1C414.6 241.3 416 251.1 416 256C416 260.9 414.6 270.7 406.6 278.6z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="cs-articals swiper">
          <div className="swiper-wrapper">{articalUi}</div>
        </div>
      </div>
    );
  };

  console.log(renderArticalsUi());

  /** Add Selected Value And Remove De selected values*/
  const addSelectedValues = (isSelected, valueToSelect) => {
    //if value to select an array
    if (
      isSelected === true &&
      typeof valueToSelect === "object" &&
      valueToSelect[0]
    ) {
      //check for duplicates
      let nonDuplicateIds = [];
      valueToSelect.map((value) => {
        if (selectedValues.includes(value) === false) {
          nonDuplicateIds = [...nonDuplicateIds, value];
          setSelectedValues([...selectedValues, ...nonDuplicateIds]);
        }
      });
    }
    //if value to select "not" an array
    if (
      isSelected === true &&
      selectedValues.includes(valueToSelect) === false &&
      typeof valueToSelect !== "object"
    ) {
      setSelectedValues([...selectedValues, valueToSelect]);
    }

    //remove de selected value
    if (typeof valueToSelect !== "object") {
      const valueIndex = selectedValues.indexOf(valueToSelect);
      if (
        isSelected === false &&
        selectedValues.includes(valueToSelect) === true &&
        valueIndex > -1
      ) {
        //remove selected value
        let newSelectedValuesArr = [...selectedValues];
        newSelectedValuesArr.splice(valueIndex, 1);
        setSelectedValues(newSelectedValuesArr);
      }
    }
  };

  // On Select Item Click
  const onSelectItemClick = (isSelected, valueToSelect) => {
    addSelectedValues(isSelected, valueToSelect);
  };

  //default posts render
  const defaultPosts = () => {
    if (data) {
      if (selectedValues[0]) {
        return data.map((artical) => {
          const imgObj = artical._embedded["wp:featuredmedia"];
          if (selectedValues.includes(artical.id) === true) {
            return (
              <SelectItem
                image={imgObj[0].source_url}
                text={artical.title.rendered}
                isLoading={false}
                isDefaultSelected={true}
                onClick={onSelectItemClick}
                valueToSelect={artical.id}
              />
            );
          } else {
            return (
              <SelectItem
                image={imgObj[0].source_url}
                text={artical.title.rendered}
                isLoading={false}
                onClick={onSelectItemClick}
                isDefaultSelected={false}
                valueToSelect={artical.id}
              />
            );
          }
        });
      } else {
        return data.map((artical) => {
          const imgObj = artical._embedded["wp:featuredmedia"];
          return (
            <SelectItem
              image={imgObj[0].source_url}
              text={artical.title.rendered}
              isLoading={false}
              valueToSelect={artical.id}
              onClick={onSelectItemClick}
            />
          );
        });
      }
    }
  };

  const getRecentDate = () => {};

  //Advance Post Select
  const advancePostSelect = async () => {
    // if (data) {
    //Select recent posts
    if (
      selectPostByAdvanceOption &&
      selectPostByAdvanceOption.toLowerCase() === "recent posts"
    ) {
      setIsFetching(true);

      let latestPosts;
      if (advanceMaxPostCount === 0) {
        latestPosts = await fetchData(
          "per_page=" + dynamicPostSelectCount + "&orderby=date&order=asc"
        );
      } else {
        latestPosts = await fetchData(
          "per_page=" + advanceMaxPostCount + "&orderby=date&order=asc"
        );
      }
      if (latestPosts[0]) {
        //add selected data
        setSelectedData([...selectedData, ...latestPosts]);
      }
      // Push Latest Posts Id To Selected Posts
      let recentPostIds = [];
      if (latestPosts[0]) {
        latestPosts.map((post) => {
          recentPostIds.push(post.id);
        });
        //!!!error Posts Not Resettin
        //set only recent posts
        if (
          isDynamicPosts === true
        ) {
          setSelectedValues([...recentPostIds]);
        } else {
          //reset select values when static posts
          setSelectedValues([]);
        }
      }
    }
    // }
  };

  const onAdvancePostSettingSave = () => {
    advancePostSelect();
    // close popup
    setIsPopupRendered(false);
    //set isStaticPosts
    setIsStaticPosts(!isDynamicPosts);
  };

  //render searched posts
  const searchedPosts = () => {
    if (searchData[0]) {
      if (selectedValues[0]) {
        return searchData.map((artical) => {
          const imgObj = artical._embedded["wp:featuredmedia"];
          if (selectedValues.includes(artical.id) === true) {
            return (
              <SelectItem
                image={imgObj[0].source_url}
                text={artical.title.rendered}
                isLoading={false}
                isDefaultSelected={true}
                onClick={onSelectItemClick}
                valueToSelect={artical.id}
              />
            );
          } else {
            return (
              <SelectItem
                image={imgObj[0].source_url}
                text={artical.title.rendered}
                isLoading={false}
                onClick={onSelectItemClick}
                isDefaultSelected={false}
                valueToSelect={artical.id}
              />
            );
          }
        });
      } else {
        return searchData.map((artical) => {
          const imgObj = artical._embedded["wp:featuredmedia"];
          return (
            <SelectItem
              image={imgObj[0].source_url}
              text={artical.title.rendered}
              isLoading={false}
              valueToSelect={artical.id}
              onClick={onSelectItemClick}
            />
          );
        });
      }
    }
  };
  //render loading screen
  const loadingPosts = () => {
    const items = [];
    for (let i = 0; postsPerView > i; i++) {
      items.push(<SelectItem isLoading={true} />);
    }
    return items;
  };

  // combine 2 arrays and remove if theres any duplicates
  const combineArray = (arrayOne, arrayTwo) => {
    let combinedArray = [...arrayOne, ...arrayTwo];
    //understand this
    return combinedArray.filter(
      (item1, index, array) =>
        array.findIndex((item2) => item2.id === item1.id) === index
    );
  };

  // on dynamic select item click render an error message
  const onDynamicSelectItemClick = () => {
    setIsError(true);
    setErrMsg("You Can't Deselect Dynamic Posts");
  };

  //render sorted posts
  const renderSortedPosts = () => {};
  //render selected posts
  const renderSelectedPosts = () => {
    if (selectedValues[0]) {
      return selectedValues.map((postId) => {
        const withSelectedData = combineArray(data, selectedData);
        return withSelectedData.map((artical) => {
          if (postId === artical.id) {
            const imgObj = artical._embedded["wp:featuredmedia"];
            if (isStaticPosts === true) {
              return (
                <SelectItem
                  image={imgObj[0].source_url}
                  text={artical.title.rendered}
                  isLoading={false}
                  isDefaultSelected={true}
                  onClick={onSelectItemClick}
                  valueToSelect={artical.id}
                />
              );
            } else {
              return (
                <SelectItem
                  image={imgObj[0].source_url}
                  text={artical.title.rendered}
                  isLoading={false}
                  isDefaultSelected={true}
                  onClick={onDynamicSelectItemClick}
                  valueToSelect={artical.id}
                  disableSelect={true}
                />
              );
            }
          }
        });
      });
    }
  };

  const renderErrorMessage = () => {
    return (
      <div className="block-config__error-message">
        <h2 className="heading">Select Posts Disabled</h2>
        <p className="para">Disable Dynamic Posts In 'Dynamic Posts'</p>
      </div>
    );
  };

  const renderArticles = () => {
    if (isFetching === true) {
      return loadingPosts();
    }
    if (
      isSearching === true &&
      searchData[0] &&
      showIsSelectedPosts === false
    ) {
      return searchedPosts();
    }
    if (showIsSelectedPosts === true) {
      return renderSelectedPosts();
    } else if (isSearching === false) {
      return defaultPosts();
    }
  };

  const setSelectPostAdvanceValue = (value) => {
    setSelectPostByAdvanceOption(value);
    setIsFilterPostDropdownOpen(!isFilterPostDropdownOpen);
  };

  const toggleFilterPostDropdown = () => {
    setIsFilterPostDropdownOpen(!isFilterPostDropdownOpen);
  };

  // Fetch and set sorted Posts As Data
  const fetchSortedPost = (sortBy) => {
    setIsFetching(true);
    fetchData(`per_page=${postsPerView}&orderby=${sortBy}`).then((values) =>
      setData(values)
    );
  };

  const onAddArticlesClick = () => {
    props.setAttributes({ isDynamicArticles: !isStaticPosts });
    console.log(advanceMaxPostCount);
    props.setAttributes({ dynamicPostSelectCount: advanceMaxPostCount });
    //save selected values to attributes
    console.log(selectedData);
    if (!isDynamicPosts || isDynamicPosts === false) {
      props.setAttributes({ staticPosts: selectedValues });
      //save selected pre load post data
      props.setAttributes({ staticPostsPreLoadData: selectedData });

      //Articles Validation
      if (selectedValues.length >= minPostCount) {
        //hide block config
        props.setAttributes({ isConfig: false });
      }else{
        setIsError(true);
        setErrMsg(`Minimum ${minPostCount} Posts Must Be Selected`);
      }
    } else {
      //save dynamic block type with post count
      props.setAttributes({
        dynamicPosts: {
          type: selectPostByAdvanceOption,
          count: advanceMaxPostCount,
        },
      });
      props.setAttributes({ staticPosts: [] });
      //remove selected pre load post data
      props.setAttributes({ staticPostsPreLoadData: [] });
      console.log(dynamicPosts.count >= minPostCount)
      if (dynamicPosts.count >= minPostCount) {
        //hide block config
        props.setAttributes({ isConfig: false });
      }else{
        setIsError(true);
        setErrMsg(`Minimum ${minPostCount} Posts Must Be Selected`);
      }
    }
  };

  const showSortPostDropdown = () => {
    if (showIsSelectedPosts === true || isSearching === true) {
      return true;
    }
  };

  const blockSettings = () => {
    return (
      <GuternbergBlockConfig
        name="Recommended Posts"
        description="Select Posts To Display"
        notificationText={errMsg}
        onNotificationClose={() => {
          setIsError(false);
        }}
        isNotificationOpen={isError}
      >
        <NavBar>
          <NavGroup>
            <NavItem>
              <SearchBar
                onChange={(value) => setSearchValue(value)}
                onClearInput={() => {
                  //reset search value
                  setSearchValue("");
                }}
              />
            </NavItem>
            <NavItem>
              <DropdownSm
                dropdownItems={["Sort Posts By", "Date", "Modified", "Title"]}
                onChange={(value) => {
                  setSortByType(value);
                }}
                disabled={showSortPostDropdown()}
              />
            </NavItem>
          </NavGroup>
          <NavGroup>
            <NavItem>
              <NavButton
                name="Selected Posts"
                isSelected={showIsSelectedPosts}
                onClick={() => {
                  setShowIsSelectedPosts(!showIsSelectedPosts);
                }}
              />
            </NavItem>
            <NavItem>
              <NavButton
                name="Dynamic Posts"
                onClick={() => {
                  setIsPopupRendered(!isPopupRendered);
                }}
                isSelected={isPopupRendered}
              />
            </NavItem>
          </NavGroup>
          <NavGroup>
            <NavItem>
              <NavButton
                name="Add Articles"
                isSelected={true}
                onClick={onAddArticlesClick}
              />
            </NavItem>
            <NavItem>
              <NavButton
                name="Close"
                onClick={() => {
                  props.setAttributes({ isConfig: false });
                }}
              />
            </NavItem>
          </NavGroup>
        </NavBar>
        {/* Popup */}
        <Popup
          isPopupRendered={isPopupRendered}
          label="Add Dynamic Posts"
          onClose={() => {
            setIsPopupRendered(false);
          }}
        >
          <PopupGroup>
            <PopupItem>
              <ToggleBtn
                label="Enable Dynamic Posts"
                onClick={() => {
                  setIsDynamicPosts(!isDynamicPosts);
                }}
                isEnable={isDynamicPosts}
              />
            </PopupItem>
            {isDynamicPosts ? (
              <>
                <PopupItem>
                  <Dropdown
                    label="Select Posts By"
                    value={selectPostByAdvanceOption}
                    isOpen={isFilterPostDropdownOpen}
                    onClick={toggleFilterPostDropdown}
                  >
                    <DropdownItem
                      value="Recent Posts"
                      onClick={setSelectPostAdvanceValue}
                    >
                      Recent Posts
                    </DropdownItem>
                  </Dropdown>
                </PopupItem>
                <PopupItem>
                  <NumberInputControl
                    label="Maximum Posts To Select"
                    placeholder="Post Count"
                    onChange={(value) => {
                      setAdvanceMaxPostCount(Number(value.target.value));
                    }}
                    value={advanceMaxPostCount}
                  />
                </PopupItem>
              </>
            ) : (
              <></>
            )}
          </PopupGroup>
          <NavGroup>
            <NavButton
              name={`Save & Apply`}
              isSelected={true}
              onClick={onAdvancePostSettingSave}
            />
          </NavGroup>
        </Popup>
        {isStaticPosts === true || showIsSelectedPosts === true ? (
          <div className="block-config__select-posts">{renderArticles()}</div>
        ) : (
          renderErrorMessage()
        )}
      </GuternbergBlockConfig>
    );
  };

  return (
    <>
      <Toolbar props={props} />
      <Sidebar props={props} />
      <div {...blockProps}>
        {isConfig ? blockSettings() : renderArticalsUi()}
      </div>
    </>
  );
};

export default Edit;
